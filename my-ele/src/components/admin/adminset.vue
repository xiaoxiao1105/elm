<template>
    <div>
        <h2>管理员信息</h2>
        <div class="ad">
            <p>姓名：{{obj.user_name}}</p>
            <p>注册时间：{{obj.create_time}}</p>
            <p>管理员权限：{{obj.admin}}</p>
            <p>管理员ID：{{obj.id}}</p>
            <p>更换头像：
                 <el-upload
            class="avatar-uploader"
            :action="'https://elm.cangdu.org/admin/update/avatar/'+obj.id"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="obj.avatar"
              :src="'//elm.cangdu.org/img/' + obj.avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
            </p>
            
        </div>
    </div>
</template>

<script>
export default {
data(){
    return{
        obj:{},
    }
},
mounted(){
this.axios.get('https://elm.cangdu.org/admin/info').then(res=>{
    console.log(res.data)
    if(res.data.status){
        this.obj=res.data.data
    }
})
},
methods:{
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传
    handleAvatarSuccess(res, file) {
      if (res.status == 1) {
        this.obj.avatar = res.image_path;
      } else {
        this.$message.error("上传头像图片失败");
      }
    },
}
}
</script>

<style lang="scss">
h2{
    text-align: center;
    padding:10px 0;
}
.ad{
    width:50%;
    height: 500px;
    background: #eee;
    margin:0 auto;
    padding-left:20px;
    border-radius: 10px;
    p{
        height: 40px;
        line-height: 40px;
        color:gray;
    }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 125px;
  height: 125px;
  line-height: 125px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
