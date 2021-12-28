<template>
	<div class="bottom-leader">
		<!-- 本校区排名 -->
		<div class="bottomItem">
			<span class="bottomTitle">本校区排名</span>
			<div class="content">
				<span
					:class="'rank' + MySchoolRank"
					v-if="MySchoolRank >= 1 && MySchoolRank <= 3"
					>第{{ changeToZh_cn(MySchoolRank) }}名</span
				>
				<div v-else class="largeRank">
					<span :class="MySchoolRank < 100 ? 'beforeRank' : 'beforeRank1'">{{
						MySchoolRank
					}}</span>
					<span class="rank"> 第{{ changeToZh_cn(MySchoolRank) }}名 </span>
				</div>
			</div>
		</div>
		<!-- 全区第一名学校 -->
		<div class="bottomItem">
			<span class="bottomTitle">全区第一名学校</span>
			<div class="content">
				<span class="schoolName" :title="FirstSchool">{{ FirstSchool }}</span>
				<span class="schoolScore numberColor" v-if="!isScore"
					>{{ FirstScore }}份</span
				>
				<span class="schoolScore numberColor" v-else>{{ FirstScore }}分</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		MySchoolRank: {
			type: Number,
			default: 1,
		},
		FirstSchool: {
			type: String,
			default: "学校",
		},
		FirstScore: {
			type: Number,
			default: 100,
		},
		isScore: {
			type: Boolean,
			default: true,
		},
	},
	methods: {
		// 数字转换中文
		changeToZh_cn(n) {
			let _change = {
				// 数字与中文映射
				ary0: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
				// 每四位以内的单位
				ary1: ["", "十", "百", "千"],
				// 四位以上的单位
				ary2: ["", "万", "亿", "兆"],
				init: function (name) {
					this.name = name;
				},
				strrev: function () {
					let ary = [];
					for (let i = this.name.length; i >= 0; i--) {
						ary.push(this.name[i]);
					}
					return ary.join("");
				}, //倒转字符串。
				isUnit: function (ary) {
					let retVal = false;
					let cur = ary[0];
					if (this.ary2.indexOf(cur) > 0) {
						retVal = true;
					}
					return retVal;
				}, // 检查是否时ary2中的单位
				pri_ary: function () {
					// 反转后再逐位处理
					let ary = this.strrev();
					// 是否读零
					let zero = "";
					// 缓存结果
					let newary = "";
					// 万级单位数组索引
					let i4 = -1;
					for (let i = 0; i < ary.length; i++) {
						// 首先判断万级单位，每隔四个字符就让万级单位数组索引号递增
						if (i % 4 == 0) {
							i4++;
							// 将万级单位存入该字符的读法中去，它肯定是放在当前字符读法的末尾，所以首先将它叠加入$r中，
							newary = this.ary2[i4] + newary;
							// 在万级单位位置的“0”肯定是不用的读的，所以设置零的读法为空
							zero = "";
						}
						//关于0的处理与判断。
						//如果读出的字符是“0”，执行如下判断这个“0”是否读作“零”
						if (ary[i] == "0") {
							switch (i % 4) {
								case 0:
									break;
								// 如果位置索引能被4整除，表示它所处位置是万级单位位置，
								// 这个位置的0的读法在前面就已经设置好了，所以这里直接跳过
								case 1:
								case 2:
								case 3:
									// 如果不被4整除，那么都执行这段判断代码：
									// 如果它的下一位数字（针对当前字符串来说是上一个字符，因为之前执行了反转）也是0，
									// 那么跳过，否则读作“零”
									if (ary[i - 1] != "0") {
										zero = "零";
									}
									break;
							}

							newary = zero + newary;
							zero = "";
						} else {
							// 如果不是“0”，就将该当字符转换成数值型，
							// 并作为数组ary0的索引号，以得到与之对应的中文读法，
							// 其后再跟上它的的一级单位（空、十、百还是千）最后再加上前面已存入的读法内容。
							newary = this.ary0[parseInt(ary[i])] + this.ary1[i % 4] + newary;
						}
					}
					// 用while处理最前面的零和单位（前面没有数字则不需要单位）
					while (newary.indexOf("零") == 0 || this.isUnit(newary)) {
						newary = newary.substr(1);
					}
					return newary;
				},
			};

			//创建class类
			function change() {
				this.init.apply(this, arguments);
			}
			change.prototype = _change;

			//创建实例
			let k = new change(n.toString());
            return k.pri_ary()
		},
	},
};
</script>

<style lang="scss" scoped>
.numberColor {
	color: #a2afcc;
}
.bottom-leader {
	display: flex;
	display: -webkit-flex;
	width: 94%;
	margin-top: 10px;
	justify-content: space-around;
	.bottomItem {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		width: 180px;
		height: 60px;
		border-radius: 4px;
		background-image: linear-gradient(
			to right,
			rgba(255, 255, 255, 0.1),
			rgba(255, 255, 255, 0)
		);
		.content {
			display: flex;
			display: -webkit-flex;
			margin: 0 0 0 15px;
			span {
				width: 150px;
				height: 20px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-family: YouSheBiaoTiHei;
				font-size: 18px;
				line-height: 28px;
			}
			.largeRank {
				display: flex;
				display: -webkit-flex;
				flex-direction: row;
				align-items: center;
			}
			.beforeRank {
				height: 22px;
				width: 22px;
				border-radius: 50%;
				font-size: 14px;
				font-family: ArialMT;
				color: #666666;
				background: linear-gradient(to right, #dbdbdb, #bababa);
				line-height: 22px;
				text-align: center;
			}
			.beforeRank1 {
				height: 22px;
				width: 30px;
				border-radius: 50%;
				font-size: 14px;
				font-family: ArialMT;
				color: #666666;
				background: linear-gradient(to right, #dbdbdb, #bababa);
				line-height: 22px;
				text-align: center;
			}
			.rank {
				height: 28px;
				padding-left: 6px;
				line-height: 28px;
			}
			.rank1 {
				height: 28px;
				background: url(~@/assets/img/eduSchool/第一名.png) 0px center no-repeat;
				padding-left: 30px;
				line-height: 28px;
			}
			.rank2 {
				height: 28px;
				background: url(~@/assets/img/eduSchool/第二名.png) 0px center no-repeat;
				padding-left: 30px;
				line-height: 28px;
			}
			.rank3 {
				height: 28px;
				background: url(~@/assets/img/eduSchool/第三名.png) 0px center no-repeat;
				padding-left: 30px;
				line-height: 28px;
			}
			.schoolScore {
				width: 50px;
				font-size: 12px;
				font-family: MicrosoftYaHei;
			}
		}
	}
	.bottomTitle {
		margin: 3px 0 5px 0;
		padding-left: 15px;
		font-size: 16px;
		font-family: YouSheBiaoTiHei;
		color: #00aaff;
		background: url(~@/assets/img/teacher/标题小标签.png) 0px center no-repeat;
	}
}
</style>
