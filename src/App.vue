<template>
  <div class="restaurant-menu">
    <h1 class="menu-title">Restaurant Menu</h1>
    <ul class="menu-list">
      <li v-for="category in categories" :key="category.id" :class="{ 'top-parent': category.parent_id === null, 'parent': category.parent_id !== null && category.parent.parent_id === null }">
        {{ category.name }}
        <template v-if="category.categories && category.categories.length > 0">
          <ul class="submenu-list">
            <li v-for="childCategory in category.categories" :key="childCategory.id">
              {{ childCategory.name }}
              <ul class="item-list">
                <li v-for="item in childCategory.items" :key="item.id" class="item">{{ item.name }} ${{ item.price }}</li>
              </ul>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul class="item-list">
            <li v-for="item in category.items" :key="item.id" class="item">{{ item.name }} ${{ item.price }}</li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import apiClient from './api';

export default {
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.fetchMenuData();
  },
  methods: {
    fetchMenuData() {
      apiClient.get('/categories')
        .then(response => {
          console.log(response);
          this.categories = response.data.data;
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },
  },
};
</script>

<style scoped>
.restaurant-menu {
  font-family: 'Arial', sans-serif;
  max-width: 600px;
  margin: auto;
}

.menu-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.menu-list {
  list-style-type: none;
  padding: 0;
}

.top-parent {
  color: #3498db; /* Blue color for top parent */
}

.parent {
  color: #27ae60; /* Green color for parent */
}

.submenu-list {
  list-style-type: none;
  padding: 0;
  margin-left: 20px;
}

.item-list {
  list-style-type: none;
  padding: 0;
  margin-top: 0.5em;
}

.item {
  color: #f39c12; /* Orange color for item */
  margin-left: 20px;
}
</style>