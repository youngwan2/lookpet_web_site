<template>
  <div class="page_container">
    <div class="hospital_title">
      <h1>동물병원 정보 조회</h1>
      <span class="page_message"
        >현재 페이지: {{ currentPage }}/{{ totalPage }}</span
      >
    </div>
    <div class="region_box">
      <button
        class="region_menu"
        v-for="p in region"
        :key="p"
        @click="getArea($event)"
        :class="{ selected: p === area }"
      >
        {{ p }}
      </button>
      <button
        class="near_btn"
        @click="locMarker"
        :class="{ selected: locArea === '우리 동네' }"
      >
        우리 동네
      </button>
    </div>
    <!-- 현재 위치 주소 -->
    <h3 class="hospital_address">
      {{ address || '여기에 주소가 표시됩니다.' }}
    </h3>
    <div class="hospital_content">
      <div class="hospital_list">
        <ul>
          <li
            class="hospital_name"
            v-for="data in hospitalInfo"
            :key="data.id"
            @click="loadScript(data.address, data.name)"
            :class="{ selected: data.address === address }"
          >
            {{ data.name }}
          </li>
        </ul>
      </div>
      <div class="map_box">
        <div class="map" ref="map"></div>
      </div>
    </div>

    <!-- 페이지 네이션 -->
    <nav class="pagination_nav">
      <ol class="pagination_box">
        <li class="page_shifter" @click="prevPage" v-show="currentPage !== 1">
          prev
        </li>
        <li
          class="page_shifter"
          v-for="(page, i) in pageList"
          :key="i"
          @click="getNextPage"
        >
          {{ page }}
        </li>
        <li
          class="page_shifter"
          @click="nextPage"
          v-show="totalPage > lastPage"
        >
          next
        </li>
      </ol>
    </nav>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'hospital',
  data() {
    return {
      hospitalInfo: {},
      region: [
        '서울특별시',
        '부산광역시',
        '대구광역시',
        '인천광역시',
        '광주광역시',
        '대전광역시',
        '울산광역시',
        '세종특별자치시',
        '경기도',
        '강원특별자치도',
        '충청북도',
        '충청남도',
        '전라북도',
        '전라남도',
        '경상북도',
        '경상남도',
        '제주특별자치도'
      ],
      area: '',
      locArea: '',
      currentPage: 1,
      firstPage: 1,
      displayPage: 5,
      lastPage: 5,
      currentPageGroup: Math.ceil(this.currentPage / this.displayPage),
      totalInfoCnt: 0,
      pageList: [1, 2, 3, 4, 5],
      maxPage: 0,
      totalPage: 0,
      focusPage: 1,
      focus: '',
      address: ''
    }
  },
  methods: {
    async loadScript(a, n) {
      this.address = a
      console.log(this.address)
      if (!window.kakao) {
        const script = document.createElement('script')
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_API_KEY}&libraries=services,drawing&autoload=false`
        script.async = true

        script.onload = () => {
          window.kakao.maps.load(() => {
            this.loadMap(a, n)
          })
        }
        document.head.appendChild(script)
      } else {
        this.loadMap(a, n)
      }
    },
    loadMap(a, n) {
      const mapContainer = this.$refs.map
      const mapOptions = {
        center: new window.kakao.maps.LatLng(35.152381, 129.059767),
        level: 3
      }
      const map = new window.kakao.maps.Map(mapContainer, mapOptions)

      const geocoder = new window.kakao.maps.services.Geocoder()

      // 주소로 좌표를 검색합니다
      geocoder.addressSearch(a, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords
          })

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${n}</div>`
          })
          infowindow.open(map, marker)

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords)
        }
      })
    },
    locMarker() {
      this.locArea = '우리 동네'
      this.area = ''
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            const mapContainer = document.querySelector('.map')
            const mapOptions = {
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 3
            }
            const map = new window.kakao.maps.Map(mapContainer, mapOptions)

            // 중심 마커 위치 지정
            const markerPosition = new window.kakao.maps.LatLng(
              latitude,
              longitude
            )

            const marker = new window.kakao.maps.Marker({
              map: map,
              position: markerPosition
            })

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:3px 0;">현재 위치</div>`
            })
            infowindow.open(map, marker)
            this.getNearbyHospital(map.getCenter())
            map.setCenter(markerPosition)
          },
          (error) => {
            console.error('현재 위치를 가져오는데 실패했습니다.:', error)
          }
        )
      } else {
        console.error('이 브라우저에서는 지원하지 않습니다.')
      }
    },
    async getNearbyHospital(center) {
      const geocoder = new window.kakao.maps.services.Geocoder()
      await geocoder.coord2RegionCode(
        center.getLng(),
        center.getLat(),
        async (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const getAddress = result[0].address_name.split(' ')
            const index = getAddress.length - 2
            const address = getAddress[index]
            this.area = address
            console.log(this.area)

            this.getAreaInfo()
          }
        }
      )
    },
    async getArea(e) {
      this.area = e.target.innerText
      this.currentPage = 1
      this.locArea = ''
      this.getAreaInfo()
    },
    // 각 번호 클릭 시 페이지 이동 함수
    getNextPage(e) {
      console.log(e.target.innerText)
      this.currentPage = e.target.innerText * 1
      this.getAreaInfo()
      this.paginationControlFunc(this.currentPage)
    },
    // 페이지네이션 기본 셋팅 함수
    paginationControlFunc(currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.currentPageGroup = Math.ceil(currentPage / this.displayPage)
      this.lastPage = this.displayPage * this.currentPageGroup
      this.firstPage = this.lastPage - this.displayPage + 1

      const list = []
      if (this.lastPage >= this.totalPage) {
        this.lastPage = this.totalPage
      }
      for (let i = this.firstPage; i <= this.lastPage; i++) {
        list.push(i)
      }
      this.pageList = list
    },
    // 다음 페이지 이동 함수
    nextPage() {
      console.log('다음 페이지 이동중')
      console.log(this.maxPage)
      if (this.currentPage <= this.maxPage) {
        this.currentPage++
        this.getAreaInfo()
        this.paginationControlFunc(this.currentPage)
        console.log('현재페이지:', this.currentPage)
      }
    },
    // 이전 페이지 이동 함수
    prevPage() {
      console.log('이전 페이지 이동중')
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1
        this.getAreaInfo()
        this.paginationControlFunc(this.currentPage)
      }
      console.log('현재페이지:', this.currentPage)
    },
    // 서버로부터 병원 정보를 받아오는 함수
    getAreaInfo() {
      axios
        .get(
          `http://localhost:3000/tools/hospital/?region=${this.area}&page=${
            this.currentPage || 1
          }`
        )
        .then((response) => {
          if (response.status === 200) {
            this.hospitalInfo = response.data.result
            this.totalInfoCnt = response.data.totalCount * 1
            this.maxPage = this.totalInfoCnt / this.displayPage
            this.totalPage = response.data.totalPage
            this.focusPage = response.data.page
            console.log(this.hospitalInfo)
          }
        })
        .catch((error) => {
          console.log(
            '동물병원정보 데이터를 가져오는중에 에러가 발생했습니다.:',
            error
          )
        })
    }
  },
  // 페이지 첫 화면 세팅
  async mounted() {
    await axios
      .get('http://localhost:3000/tools/hospital')
      .then((response) => {
        if (response.status === 200) {
          this.hospitalInfo = response.data.result
          this.totalPage = response.data.totalPage
        }
      })
      .catch((error) => {
        console.log(
          '동물병원정보 데이터를 가져오는중에 에러가 발생했습니다.:',
          error
        )
      })
    if (window.kakao && window.kakao.maps) {
      // 카카오 객체가 있고, 카카오 맵그릴 준비가 되어 있다면 맵 실행
      this.locMarker()
    } else {
      // 없다면 카카오 스크립트 추가 후 맵 실행
      this.loadScript()
    }
  }
}
</script>

<style scoped>
.page_container {
  /* border:3px solid aqua; */
  min-height: 100vh;
  animation: appear 1s 1 ease-in-out;
}

@keyframes appear {
  from {
    opacity: 0;
    visibility: hidden;
  }
}

/* 페이지 타이틀 */
.hospital_title {
  color: #b19191;
  text-align: center;
  margin: 30px;
}

/* 카테고리 박스 */
.region_box {
  padding: 20px;
  text-align: center;
  border: 3px solid rgb(208, 165, 145);
  margin: 0 auto;
  max-width: 1375px;
  border-radius: 10px;
  background: white;
}

/* 각 카테고리 */
.region_box .region_menu {
  box-shadow: 0 0 1px 1px rgb(217, 109, 15);
  border-radius: 2px;
  border: none;
  font-size: 14px;
  margin: 0 0 10px 10px;
  padding: 10px;
  background: #ffffff;
  color: black;
  transition: 0.1s ease-in;
}
.region_box .region_menu:hover {
  transform: scale(1.01);
  color: white;
  background: rgb(198, 111, 17);
  box-shadow: 3px 3px 5px gray;
  cursor: pointer;
}
.region_box .region_menu:active {
  transform: scale(1);
  background: rgb(198, 111, 17);
  box-shadow: -1px -1px 3px gray;
}
.region_box .region_menu.selected {
  background: rgb(198, 111, 17);
  color: #f9ebde;
  box-shadow: -2px -2px 5px gray;
}
.page_message {
  position: fixed;
  font-size: 14px;
  right: 5px;
  color:black;
  top: 100px;
  background: rgb(253, 241, 172);
  padding: 10px;
  border-radius: 10px;
}
/* 페이지네이션 */
.pagination_nav {
  width: 70%;
  margin: 30px auto 0 auto;
}
.pagination_box {
  display: flex;
  justify-content: center;
  align-content: center;
}
.page_shifter {
  border: 3px solid rgb(255, 153, 80);
  list-style: none;
  text-align: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 3px;
  padding: 11px 10px 10px 10px;
}
.page_shifter:hover {
  background: rgb(245, 142, 8);
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s;
}

/* 콘텐츠 */
.hospital_content {
  display: flex;
  max-width: 1420px;
  margin: 0 auto;
  justify-content: space-between;
}
.hospital_list {
  margin: 0;
  width: 35%;
  min-width: 250px;
  max-width: 300px;
  border-radius: 10px;
  border: 3px solid rgb(208, 165, 145);
  background: white;
  color: black;

  padding: 10px 10px;
  overflow: hidden;
}
.hospital_name {
  font-weight: 500;
  list-style: decimal;
  line-height: 1.6;
  width: 100%;
  font-size: 18px;
  transition: 0.1s;
  margin-bottom: 5px;
  transition: 0.3s;
}
.hospital_name:hover {
  cursor: pointer;
  color: brown;
}
.hospital_name.selected {
  border-radius: 5px;
  background: brown;
  padding-left: 10px;
  color: white;
}

/* 우리 동네 */
.near_btn {
  border: none;
  border-radius: 10px;
  font-weight: 800;
  font-size: 1.3em;
  background: rgb(198, 111, 17);
  color: #f9ebde;
  list-style: none;
  transition: 0.1s;
  margin: 5px 15px 10px 15px;
  box-shadow: 3px 3px 3px gray;
}
.near_btn:hover {
  transform: scale(1.01);
  color: #f9ebde;
  background: #815854;
  box-shadow: 1px 1px 5px gray;
}
.near_btn:active {
  background: rgb(198, 111, 17);
  color: #f9ebde;
  box-shadow: -1px -1px 5px gray;
}
.near_btn.selected {
  background: rgb(198, 111, 17);
  color: #f9ebde;
  box-shadow: -2px -2px 5px gray;
}
.map_box {
  margin: 20px 0 20px 30px;
  width: 90%;
  height: 100%;
}
.map {
  margin: auto;
  filter: drop-shadow(0 0 2px rgb(108, 62, 17));
  height: 700px;
}

/* 병원 주소 */
.hospital_address {
  text-align: center;
  background: white;
  margin: 15px auto 15px auto;
  padding: 30px 10px;
  border: 3px solid rgb(201, 169, 144);
  max-width: 1395px;
  border-radius: 10px;
}
</style>
