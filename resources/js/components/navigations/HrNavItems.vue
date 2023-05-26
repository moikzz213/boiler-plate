<template>
  <div>
    <div v-for="item in sideNavigation" :key="item.title" :value="item.title">
      <v-list-group v-if="item.subs" :value="item.title">
        <template v-slot:activator="{ props }">
          <v-list-item
            nav
            v-bind="props"
            :prepend-icon="item.icon"
            :title="item.title"
          ></v-list-item>
        </template>
        <div class="bg-grey-darken-4" style="border-radius: 4px">
          <v-list-item
            density="compact"
            style="padding-left: 12px !important"
            v-for="(sub, i) in item.subs"
            :key="i"
            :title="sub.title"
            :value="sub.title"
            @click="() => openPage(sub.path)"
          >
            <template v-slot:title>
              <div style="font-size: 12px">{{ sub.title }}</div>
            </template>
            <template v-slot:prepend>
              <v-icon size="16" :icon="sub.icon"></v-icon>
            </template>
          </v-list-item>
        </div>
      </v-list-group>
      <v-list-item
        v-else
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.title"
        @click="() => openPage(item.path)"
      ></v-list-item>
    </div>
  </div>
</template>

<script setup>

</script>
