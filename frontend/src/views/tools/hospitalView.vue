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
        @click="getAreaInfo(), getArea($event)"
      >
        {{ p }}
      </button>
    </div>
    <div class="hospital_content">
      <div class="hospital_list">
        <ul>
          <li
            class="hospital_name"
            v-for="data in hospitalInfo"
            :key="data.id"
            @click="showDetail(data.x, data.y)"
          >
            {{ data.name }}
          </li>
        </ul>
      </div>
      <div class="map_box">
        <div class="map" style="width: 500px; height: 400px"></div>
      </div>
    </div>
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
      focus: ''
    }
  },
  methods: {
    // async showDetail(x, y) {
    //   console.log(x, y)
    //   if (!window.kakao) {
    //     // If 'kakao' is not defined, load the Kakao Maps script
    //     const script = document.createElement('script')
    //     script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_API_KEY}&libraries=services,drawing&autoload=false`
    //     script.async = true

    //     script.onload = () => {
    //       // Callback executed when Kakao Maps script is loaded
    //       kakao.maps.load(() => {
    //         this.initMap(x, y)
    //       })
    //     }

    //     document.head.appendChild(script)
    //   } else {
    //     // Kakao Maps is already loaded, directly call initMap
    //     this.initMap(x, y)
    //   }
    // },
    // async initMap(x, y) {
    //   const mapContainer = document.querySelector('.map') // Use the correct selector
    //   const mapOptions = {
    //     center: new kakao.maps.LatLng(y, x),
    //     level: 3
    //   }

    //   const map = new kakao.maps.Map(mapContainer, mapOptions)

    //   // Add a marker
    //   const markerPosition = new kakao.maps.LatLng(y, x)
    //   const marker = new kakao.maps.Marker({
    //     position: markerPosition
    //   })
    //   marker.setMap(map)
    // },
    getArea(e) {
      this.area = e.target.innerText
      this.currentPage = 1
      console.log(process.env.VUE_APP_KAKAO_API_KEY)
    },
    // 각 번호 클릭 시 페이지 이동 함수
    getNextPage(e) {
      console.log(e.target.innerText)
      this.currentPage = e.target.innerText * 1
      this.getAreaInfo()
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
          `http://localhost:3000/service/hospital/?region=${this.area}&page=${
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
      .get('http://localhost:3000/service/hospital')
      .then((response) => {
        if (response.status === 200) {
          this.hospitalInfo = response.data.result
          this.totalPage = response.data.totalPage
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
}
</script>

<style scoped>
.page_container {
  min-height: 100vh;
  animation: appear 1s 1 ease-in-out;
}

@keyframes appear {
  from {
    opacity: 0;
    visibility: hidden;
  }
}
.hospital_title {
  text-align: center;
  margin: 30px;
  border-bottom: 1px solid gray;
}
.region_box {
  padding: 10px;
  border-bottom: 1px solid gray;
  text-align: center;
}
.region_menu {
  border: none;
  margin: 0 0 10px 10px;
  padding: 5px;
  background: beige;
  transition: 0.1s ease-in;
}
.region_menu:hover {
  transform: scale(1.01);
  background: rgb(228, 185, 169);
  box-shadow: 3px 3px 5px gray;
}
.region_menu:active {
  transform: scale(1);
  background: rgb(219, 141, 113);
  box-shadow: -1px -1px 3px gray;
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
  background: rgb(245, 142, 8);
  cursor: pointer;
}
.hospital_list {
  margin: 20px;
  width: 50%;
  background: #f0f0d4;
  color: rgb(175, 120, 17);
  padding: 10px 0;
}
.hospital_name {
  font-weight: 800;
  font-size: 1.2em;
  width: 100%;
  list-style: none;
  transition: 0.1s;
  margin-bottom: 5px;
  border-bottom: 1px solid gray;
}
.hospital_name:hover {
  transform: translateX(10px);
  color: rgb(175, 172, 17);
  background: #ececde;
  box-shadow: 1px 1px 5px gray;
}
.hospital_name:active {
  box-shadow: -1px -1px 5px gray;
}
</style>
