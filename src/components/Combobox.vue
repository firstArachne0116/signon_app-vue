<template id="combobox-template">
<div class="o-combobox md-form">
    <input class="o-combobox__input form-control" type="search" v-bind:placeholder="placeholder" v-model="value" v-on:click="showAutocompleteDropdown = true" v-on:keyup.enter.prevent="select(selectedIndex)" v-on:keydown.down.prevent="selectNext()" v-on:keydown.up.prevent="selectPrev()" v-on:keyup.8="handleBackspace()" />
    <ul class="o-date-list" v-if="showAutocompleteDropdown">
      <li class="o-date-list__item" v-for="(item, index) in filtereditems" :key="index" v-on:click="select($index)" v-bind:class="{'o-date-list__item--selected': $index == selectedIndex}">{{ item }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      showAutocompleteDropdown: false,
      selectedIndex: 0,
      items: [
          'abc',
          'bcd'
      ]
    }
  },
  props: {
    placeholder: String,
    value: String,
  },
  computed: {
    filtereditems: function() {
      return this.items.filter(it => it.includes(this.value))
    },
  },
  methods: {
    handleBackspace: function () {
        this.showAutocompleteDropdown = true;
    },
    select: function(index) {
      
        this.showAutocompleteDropdown = false;
        this.value = this.filtereditems[index]
      
    },
    selectNext: function() {
      
      if (this.showAutocompleteDropdown) {
        if (this.selectedIndex < this.filtereditems.length - 1) {
        this.selectedIndex++;
      } else {
        this.selectedIndex = 0;
      }        
      } else {
        this.showAutocompleteDropdown = true;
      }

    },
    selectPrev: function() {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      } else {
        this.selectedIndex = this.filtereditems.length - 1;
      }
    }
  }
}

</script>