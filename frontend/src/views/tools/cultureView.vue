<template>
  <div class="culture_container">
    <div class="culture_title">
      <h1>반려동물 동반가능 문화시설 정보 조회</h1>
      <span class="page_message"
        >현재 페이지: {{ currentPage }}/{{ totalPage }}</span
      >
    </div>
    <!-- 지역별 -->
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
    <!-- 카테고리 -->
    <div class="category_box">
      <button
        class="category_menu"
        v-for="p in categoryInfo"
        :key="p"
        @click="getCategory($event)"
        :class="{ selected: p === category }"
      >
        {{ p }}
      </button>
    </div>
    <!-- 시설 목록 -->
    <div class="culture_content">
      <div class="culture_list">
        <ul>
          <li
            v-for="data in cultureInfo"
            :key="data.id"
            class="culture_name"
            @click="loadScript(data.x, data.y, data.name, data.address)"
            :class="{ selected: data.address === address }"
          >
            <span>{{ data.name }}</span>
          </li>
        </ul>
      </div>
      <div class="map_box">
        <div class="map" ref="map"></div>
        <h3>{{ address }}</h3>
      </div>
    </div>
    <!-- 페이지네이션 -->
    <nav class="pagination_nav">
      <ul class="pagination_box">
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
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'culture',
  data() {
    return {
      cultureInfo: [],
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
      categoryInfo: [
        '문예회관',
        '미술관',
        '미용',
        '박물관',
        '반려동물용품',
        '식당',
        '여행지',
        '위탁관리',
        '호텔',
        '카페',
        '펜션'
      ],
      category: '',
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
    async loadScript(x, y, n, a) {
      this.address = a
      if (!window.kakao) {
        const script = document.createElement('script')
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_API_KEY}&libraries=services,drawing&autoload=false`
        script.async = true

        script.onload = () => {
          window.kakao.maps.load(() => {
            this.loadMap(x, y, n)
          })
        }
        document.head.appendChild(script)
      } else {
        this.loadMap(x, y, n)
      }
    },
    loadMap(x, y, n) {
      // 카카오 맵 API를 사용하여 해당 위치를 표시
      const container = this.$refs.map
      const options = {
        center: new window.kakao.maps.LatLng(35.152381, 129.059767), // 기본 좌표(동성)
        level: 4 // 지도 확대 레벨 설정
      }
      const map = new window.kakao.maps.Map(container, options)

      const coords = new window.kakao.maps.LatLng(x, y) // 해당 데이터의 x,y 좌표를 지정

      const marker = new window.kakao.maps.Marker({
        map: map,
        position: coords
      })

      // 인포윈도우로 장소에 대한 설명을 표시합니다
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="width:150px;text-align:center;padding:6px 0;">${n}</div>`
      })
      infowindow.open(map, marker)
      map.setCenter(coords)
    },
    locMarker() {
      this.locArea = '우리 동네'
      this.area = ''
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            const mapContainer = this.$refs.map
            const mapOptions = {
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 5
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
            this.getNearbyCulture(map.getCenter())
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
    async getNearbyCulture(center) {
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

            this.getAreaCategory()
          }
        }
      )
    },
    async getArea(e) {
      this.area = e.target.innerText
      this.currentPage = 1
      this.locArea = ''
      await this.getAreaCategory()
    },
    async getCategory(e) {
      this.category = e.target.innerText
      this.currentPage = 1
      await this.getAreaCategory()
    },
    async getAreaCategory() {
      try {
        console.log(this.area)
        const response = await axios.get(
          `http://localhost:3000/tools/culture/?region=${this.area}&category=${
            this.category
          }&page=${this.currentPage || 1}`
        )
        if (response.status === 200) {
          this.cultureInfo = response.data.result
          this.totalInfoCnt = response.data.totalCount * 1
          this.maxPage = this.totalInfoCnt / this.displayPage
          this.totalPage = response.data.totalPage
          this.focusPage = response.data.page
          console.log(this.cultureInfo)
        }
      } catch (error) {
        console.log(
          '동물병원정보 데이터를 가져오는 중에 에러가 발생했습니다.:',
          error
        )
      }
    },
    // 각 번호 클릭 시 페이지 이동 함수
    getNextPage(e) {
      console.log(e.target.innerText)
      this.currentPage = e.target.innerText * 1
      this.getAreaCategory()
      this.paginationControlFunc(this.currentPage)
    },
    // // 페이지네이션 기본 셋팅 함수
    paginationControlFunc(currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.currentPageGroup = Math.ceil(currentPage / this.displayPage)
      this.lastPage = this.displayPage * this.currentPageGroup
      this.firstPage = this.lastPage - this.displayPage + 1

      console.log('첫페이지:', this.firstPage)
      console.log('마지막페이지:', this.lastPage)
      console.log('현재페이지:', this.currentPage)
      console.log(this.pageList.length)
      const list = []
      if (this.lastPage >= this.totalPage) {
        this.lastPage = this.totalPage
      }
      for (let i = this.firstPage; i <= this.lastPage; i++) {
        list.push(i)
      }
      this.pageList = list
      console.log(this.pageList)
    },
    // 다음 페이지 이동 함수
    nextPage() {
      console.log('다음 페이지 이동중')
      console.log(this.maxPage)
      if (this.currentPage <= this.maxPage) {
        this.currentPage++
        this.getAreaCategory()
        this.paginationControlFunc(this.currentPage)
        console.log('현재페이지:', this.currentPage)
      }
    },
    // 이전 페이지 이동 함수
    prevPage() {
      console.log('이전 페이지 이동중')
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1
        this.getAreaCategory()
        this.paginationControlFunc(this.currentPage)
      }
      console.log('현재페이지:', this.currentPage)
    }
    // 서버로부터 문화시설 정보를 받아오는 함수
  },
  // 페이지 첫 화면 세팅
  async mounted() {
    await axios
      .get('http://localhost:3000/tools/culture')
      .then((response) => {
        if (response.status === 200) {
          this.cultureInfo = response.data.result
          this.totalPage = response.data.totalPage
        }
      })
      .catch((error) => {
        console.log('문화시설 데이터를 가져오는 중 에러가 발생했습니다:', error)
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
.culture_container {
  min-height: 100vh;
  animation: appear 1s 1 ease-in-out;
}

@keyframes appear {
  from {
    opacity: 0;
    visibility: hidden;
  }
}
.culture_title {
  margin: 30px;
  text-align: center;
}
.category_box {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid gray;
}
.category_menu {
  border: none;
  border-radius: 5px;
  box-shadow: 3px 3px 3px gray;
  margin: 0 0 10px 10px;
  padding: 5px;
  background: #815854;
  color: #f9ebde;
  transition: 0.1s ease-in;
}
.category_menu:hover {
  transform: scale(1.01);
  background: rgb(198, 111, 17);
  box-shadow: 3px 3px 5px gray;
  cursor: pointer;
}
.category_menu:active {
  transform: scale(1);
  background: rgb(198, 111, 17);
  box-shadow: -1px -1px 3px gray;
}
.category_menu.selected {
  background: rgb(198, 111, 17);
  color: #f9ebde;
  box-shadow: -2px -2px 5px gray;
}
.page_message {
  position: fixed;
  font-size: 14px;
  bottom: 300px;
  right: 5px;
  background: rgb(253, 241, 172);
  box-shadow: inset 1px 1px 5px 2px rgb(245, 219, 69);
  padding: 10px;
  border-radius: 10px;
}
/* 페이지네이션 */
.pagination_nav {
  width: 70%;
  margin: 10px auto;
}
.pagination_box {
  display: flex;
  justify-content: center;
  align-content: center;
}
.page_shifter {
  border: 1px solid rgba(128, 128, 128, 0.807);
  list-style: none;
  text-align: center;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin: 3px;
  padding: 11px 10px 5px 10px;
}
.page_shifter:hover {
  background: rgb(255, 211, 154);
  cursor: pointer;
}
.culture_content {
  display: flex;
  margin: 0;
}
.culture_list {
  margin: 0;
  width: 30%;
  min-width: 250px;
  background: #815854;
  color: #f9ebde;
  padding: 10px 0;
  overflow: hidden;
}
.culture_name {
  font-weight: 800;
  font-size: 1.2em;
  color: #f9ebde;
  width: 100%;
  list-style: none;
  transition: 0.1s;
  margin-bottom: 5px;
  border-bottom: 1px solid #f9ebde;
  box-shadow: 1px 1px 3px gray;
  transition: 0.3s;
}
.culture_name:hover {
  transform: translateX(10px);
  color: #f9ebde;
  background: rgb(198, 111, 17);
  box-shadow: 1px 1px 5px gray;
  cursor: pointer;
}
.culture_name.selected {
  transform: translateX(10px);
  background: rgb(198, 111, 17);
  color: #f9ebde;
}
.region_box {
  padding: 10px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  text-align: center;
}
.region_menu {
  border: none;
  border-radius: 5px;
  box-shadow: 3px 3px 3px gray;
  margin: 0 0 10px 10px;
  padding: 5px;
  background: #815854;
  color: #f9ebde;
  transition: 0.1s ease-in;
}
.region_menu:hover {
  transform: scale(1.01);
  background: rgb(198, 111, 17);
  box-shadow: 3px 3px 5px gray;
  cursor: pointer;
}
.region_menu:active {
  transform: scale(1);
  background: rgb(198, 111, 17);
  box-shadow: -1px -1px 3px gray;
}
.region_menu.selected {
  background: rgb(198, 111, 17);
  color: #f9ebde;
  box-shadow: -2px -2px 5px gray;
}
.near_btn {
  border: none;
  border-radius: 10px;
  font-weight: 800;
  font-size: 1.3em;
  margin-bottom: 5px;
  background: rgb(198, 111, 17);
  color: #f9ebde;
  list-style: none;
  transition: 0.1s;
  margin: 0 10px;
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
  margin: 20px;
  width: 100%;
  height: 100%;
}
.map {
  margin: auto;
  height: 500px;
  margin-bottom: 10px;
}
</style>
