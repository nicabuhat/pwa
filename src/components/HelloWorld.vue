<template>
  <div>
    <h1>Hello</h1>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores nostrum
      velit sapiente dolor harum, illum asperiores beatae odit consectetur
      soluta!
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
