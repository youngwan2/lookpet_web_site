<template>
  <div class="container">
    <h1 class="edit_title">펫 정보 수정</h1>
    <div class="pet_image_box">
      <img class="pet_image" :src="petimage" alt="pet_image" />
      <!-- <label for="pet_image_input">이미지를 올려주세요. </label> -->
      <input
        class="pet_image_input"
        type="file"
        accept="image/*"
        @change="imageUpload"
      />
    </div>
    <div class="pet_info_detail">
      <span>이름</span>
      <input type="text" v-model="petname" :placeholder="petInfo.petname" />
    </div>
    <div class="pet_info_detail">
      <span>종</span>
      <input type="text" v-model="breeds" :placeholder="petInfo.breeds" />
    </div>
    <div class="pet_info_detail">
      <span>나이</span>
      <input type="number" v-model="age" min="1" :placeholder="petInfo.age" />
    </div>
    <div class="pet_info_detail">
      <span>아이 소개</span>
      <input
        class="pet_introduce"
        type="text"
        v-model="introduce"
        :placeholder="petInfo.introduce"
      />
    </div>
    <button
      type="submit"
      class="pet_register"
      @click="updatePetInfo(petInfo.petId)"
    >
      수정하기
    </button>
    <button @click="pageMove">취소</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'petedit',
  data() {
    return {
      petInfo: {},
      username: '',
      petimage: '',
      petname: '',
      breeds: '',
      age: '',
      introduce: ''
    }
  },
  methods: {
    async imageUpload(e) {
      const image = e.target.files[0]
      if (image) {
        const resizedImageFile = await this.resizeImage(image, 300, 300)
        const reader = new FileReader()
        reader.onload = () => {
          this.petimage = reader.result
        }
        reader.readAsDataURL(resizedImageFile)
      }
    },
    async resizeImage(imageFile, width, height) {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = URL.createObjectURL(imageFile)
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)

          canvas.toBlob((blob) => {
            resolve(new File([blob], imageFile.name, { type: imageFile.type }))
          }, imageFile.type)
        }
      })
    },
    updatePetInfo(id) {
      console.log(id)
      const newPetInfo = {
        petId: id,
        username: this.petInfo.username,
        petimage: this.petimage,
        petname: this.petname,
        breeds: this.breeds,
        gender: this.petInfo.gender,
        age: this.age,
        introduce: this.introduce
      }
      console.log(newPetInfo)
      axios
        .post(`http://localhost:3000/mypage/petedit/${id}`, { newPetInfo })
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log('수정된 정보를 전송중에 에러가 발생했습니다.:', e)
        })
    },
    pageMove() {
      this.$router.push({ path: '/mypage' })
    }
  },
  async mounted() {
    const petId = this.$route.params.id
    console.log(petId)
    await axios
      .get(`http://localhost:3000/mypage/petedit/${petId}`)
      .then((res) => {
        this.petInfo = res.data
        this.petimage = res.data.petimage
      })
      .catch((e) => {
        console.log('해당 펫 정보를 불러오는중에 에러가 발생했습니다.:', e)
      })
  }
}
</script>
<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.edit_title {
  text-align: center;
}
.gender_icon {
  font-size: 1.4rem;
  font-weight: 800;
  margin-right: 5px;
}
#gender_male {
  color: blue;
}
#gender_female {
  color: red;
}
</style>
