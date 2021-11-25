<template>
  <keep-alive>
    <div>
      <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
      <el-form label-width="120px" @submit.prevent="save">
        <el-row>
          <el-col :span="24">
            <el-tabs  type="border-card" v-model="activeName">
              <el-tab-pane label="基础信息" name="basic">
                <el-form-item label="名称">
                  <el-input
                    v-model="model.name"
                    placeholder="请输入名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="称号">
                  <el-input
                    v-model="model.title"
                    placeholder="请输入称号"
                  ></el-input>
                </el-form-item>
                <el-form-item label="类型">
                  <el-select v-model="model.categories" multiple>
                    <el-option
                      v-for="item of categories"
                      :key="item._id"
                      :label="item.name"
                      :value="item._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="头像">
                  <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'" 
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="afterUpload"
                  >
                    <img
                      v-if="model.avatar"
                      :src="model.avatar"
                      class="avatar"
                    />
                    <el-icon v-else class="avatar-uploader-icon"
                      ><plus
                    /></el-icon>
                  </el-upload>
                </el-form-item>
                <el-form-item label="难度">
                  <div>
                    <a-rate
                      v-model:value="model.scores.difficult"
                      :count="10"
                    ></a-rate>
                    {{ model.scores.difficult }}
                  </div>
                </el-form-item>
                <el-form-item label="技能">
                  <div>
                    <a-rate
                      v-model:value="model.scores.skills"
                      :count="10"
                    ></a-rate>
                    {{ model.scores.skills }}
                  </div>
                </el-form-item>
                <el-form-item label="攻击">
                  <div>
                    <a-rate
                      v-model:value="model.scores.attack"
                      :count="10"
                    ></a-rate>
                    {{ model.scores.attack }}
                  </div>
                </el-form-item>
                <el-form-item label="生存">
                  <div>
                    <a-rate
                      v-model:value="model.scores.survive"
                      :count="10"
                    ></a-rate>
                    {{ model.scores.survive }}
                  </div>
                </el-form-item>
                <el-form-item label="顺风出装">
                  <el-select v-model="model.items1" multiple>
                    <el-option
                      v-for="item of items"
                      :key="item._id"
                      :label="item.name"
                      :value="item._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="逆风出装">
                  <el-select v-model="model.items2" multiple>
                    <el-option
                      v-for="item of items"
                      :key="item._id"
                      :label="item.name"
                      :value="item._id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="使用技巧">
                  <el-input
                    type="textarea"
                    v-model="model.usageTips"
                  ></el-input>
                </el-form-item>
                <el-form-item label="对抗技巧">
                  <el-input
                    type="textarea"
                    v-model="model.battleTips"
                  ></el-input>
                </el-form-item>
                <el-form-item label="团战思路">
                  <el-input type="textarea" v-model="model.teamTips"></el-input>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="技能" name="skills">
                <el-button @click="model.skills.push({})">
                  <el-icon><Plus /></el-icon> 添加技能</el-button
                >
                <el-row type="flex" style="flex-wrap: wrap; margin-top: 10px">
                  <el-col
                    :md="12"
                    v-for="(item, index) in model.skills"
                    :key="index"
                  >
                    <el-form-item label="名称">
                      <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="图标">
                      <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="(res) => (item.icon = res.url)"
                      >
                        <img v-if="item.icon" :src="item.icon" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"
                          ><plus
                        /></el-icon>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="描述">
                      <el-input
                        type="textarea"
                        v-model="item.description"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="技巧">
                      <el-input type="textarea" v-model="item.tips"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        type="danger"
                        size="small"
                        @click="model.skills.splice(i, 1)"
                      >
                        删除
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
        <el-form-item style="margin-top: 2em">
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </keep-alive>
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
      activeName:'skills',
      categories: [],
      items: [], //装备
      model: {
        name: "",
        avatar: "",
        title: "",
        categories: [],
        scores: {
          difficult: 0,
          skills: 0,
          survive: 0,
          attack: 0,
        },
        items1: [], //顺风出装
        items2: [], //逆风出装
        usageTips: "",
        battleTips: "",
        teamTips: "",
        skills: [{ name: "", icon: "", description: "", tips: "" }],
      },
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetchHeroById() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data.filter(
        (item) => item.parent && item.parent.name === "heroes"
      );
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    afterUpload(res) {
      this.model.avatar = res.url;
    },
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
    this.id && this.fetchHeroById();
    console.log(this.getAuthHeaders())
  },
};
</script>

<style lang="scss" scoped>
.log-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>