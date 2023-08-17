<template>
    <div class="detail_container">
        <h1>디테일 페이지 고양이 전용</h1>

        <section>
            <div class="top_detail_info">
                <figure style="border: 1px solid black; width: 300px; height: 300px;">
                    <img src="" alt="">
                </figure>
                <div>
                    <ul>
                        <li><span>식별</span>{{ catDetailInfo.id }}</li>
                        <li><span>이름(영문)</span>{{ catDetailInfo.ko_name }}({{ catDetailInfo.name }})</li>
                        <li><span>수명</span>{{ catDetailInfo.life }}</li>
                        <li><span>체중</span>{{ catDetailInfo.weight }}</li>
                        <li><span>색깔</span>{{ catDetailInfo.colors }}</li>
                    </ul>
                </div>
            </div>
            <div class="bot_detail_info">
                <ul>
                    <li>
                        <p>기원 및 역사</p>
                        <p>{{ catDetailInfo.origin }}</p>
                    </li>
                    <li>
                        <p>성격</p>
                        <p>{{ catDetailInfo.personality }}</p>
                    </li>
                    <li>
                        <p>돌봄</p>
                        <p>{{ catDetailInfo.care }}</p>
                    </li>
                    <li>
                        <p>건강</p>
                        <p>{{ catDetailInfo.health }}</p>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'catDetail',
    data() {
        return {
            catDetailInfo: {}
        }
    },
    mounted() {
        const breedId = this.$route.params.id
        console.log(breedId)
        axios.get(`http://localhost:3000/cat/breed/${breedId}`).then((response) => {
            if (response.status === 200) {
                this.catDetailInfo = response.data
                console.log(response)
            }
        }).catch((error) => {
            console.error('서버에서 데이터를 받아오던 중 문제가 발생::', error)
        })
    }
}
</script>
<style>
.detail_container {
    width: 100%;
    min-height: 100vh;
}
</style>
