<template>
  <div>
    <ListCard icon="heroMenu" title="英雄列表" :categories="heroesCats">
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <div
            v-for="(hero, index) in category.heroesList"
            :key="index"
            class="p-2 text-center"
            style="width:20%"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{ hero.name }}</div>
          </div>
        </div>
      </template>
    </ListCard>
  </div>
</template>

<script>
import ListCard from "../listCard.vue";
export default {
  components: { ListCard },
  data() {
    return {
      heroesCats: [],
    };
  },
  created() {
    this.fetchHeroCates();
  },
  methods: {
    async fetchHeroCates() {
      const res = await this.$http.get("heroes/list");
      console.log(res);
      this.heroesCats = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>