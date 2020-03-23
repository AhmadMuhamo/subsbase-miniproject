<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-line',
          title: 'Stocks',
          to: '/stocks'
        },
        {
          icon: 'mdi-cash-multiple',
          title: 'Forex',
          to: '/fx'
        }
      ],
      miniVariant: false,
      title: 'SubsBase Mini-Project'
    }
  }
}
</script>
<style lang="scss">
.container {
  max-width: 100%;
}
.chart-container {
  background-color: #fff;
  width: 100%;
  margin-top: 2rem;
  div {
    color: #000;
    text-align: center;
    margin: 2rem auto;
  }
}
</style>
