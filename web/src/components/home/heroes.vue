<template>
  <div>
    <ListCard icon="heroMenu" title="英雄列表" :categories="heroesCats">
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            v-slot="{ navigate }"
            v-for="(hero, index) in category.heroesList"
            :key="index"
            :to="`/heroes/${hero._id}`"
            class="text-center p-2"
            style="width:20%"
          >
            <div @click="navigate" @keypress.enter="navigate" role="link">
              <img :src="hero.avatar" class="w-100" />
              <div>{{ hero.name }}</div>
            </div>
          </router-link>
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
      this.heroesCats = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>