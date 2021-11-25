<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form label-width="120px" @submit.prevent="save">
      <el-form-item label="名称:">
        <el-input v-model="model.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="广告:">
        <el-button @click="model.items.push({})">
          <el-icon><Plus /></el-icon> 添加广告</el-button
        >
        <el-row type="flex" style="flex-wrap: wrap; margin-top: 10px">
          <el-col :md="24" v-for="(item, index) in model.items" :key="index">
            <el-form-item label="跳转链接(url):">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片:" style="margin-top: 0.6em">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="(res) => (item.image = res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                size="small"
                @click="model.items.splice(i, 1)"
              >
                删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Plus } from "@element-plus/icons";
export default {
  components: { Plus },
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        name: "",
        items: [],
      },
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetchAdsById() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
  },
  created() {
    this.id && this.fetchAdsById();
  },
};
</script>

<style lang="scss" scoped>
</style>