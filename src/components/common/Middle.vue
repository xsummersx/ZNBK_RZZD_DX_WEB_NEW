<template>
	<div class="middle A" v-if="level === 'A'"></div>
	<div class="middle B" v-else-if="level === 'B'"></div>
	<div class="middle C" v-else-if="level === 'C'"></div>
	<div class="middle D" v-else-if="level === 'D'"></div>
	<div class="middle E" v-else-if="level === 'E'"></div>
</template>

<script>
export default {
	props: {
		level: {
			type: String,
			default: "C",
		},
	},
};
</script>

<style lang="scss" scoped>
.middle {
	width: 64px;
	// margin-top: -90px;
	height: 60px;
}
.A {
	background: url(~@/assets/img/teacher/小A+.png) center center no-repeat;
}
.B {
	background: url(~@/assets/img/teacher/小B+.png) center center no-repeat;
}
.C {
	background: url(~@/assets/img/teacher/小C+.png) center center no-repeat;
}
.D {
	background: url(~@/assets/img/teacher/小D+.png) center center no-repeat;
}
.E {
	background: url(~@/assets/img/teacher/小E+.png) center center no-repeat;
}
</style>
