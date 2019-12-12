<template>
	<div class="tag">
		<el-card class="box-card">
			<div slot="header" class="d-flex align-items-center">
				<img class="card-icon" src="@/assets/biaoqian.png" />
				<span>标签</span>
			</div>
			<div class="text item">
		    <el-tag size="mini" class="tag-item"   v-for="(item,index) in labes" :key="index" :type="types[index]" @click="tag(item.labelId)">{{item.labelName}}[{{item.count}}]</el-tag>
			</div>
      <div style="text-align: center">
        <el-pagination
          small
          layout="prev, pager, next,total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="listQuery.pageSize"
          :current-page.sync="listQuery.pageNum"
          :total="total">
        </el-pagination>
      </div>
		</el-card>
	</div>
</template>

<script>
  import {getLablePage} from '@/api/lables'
	export default {
		name: 'tag',
      data(){
		    return{
          labes:[],
          listQuery: {
              pageNum: 1,
              pageSize: 10
          },
          total:0,
          types:["success", "info", "warning", "warning", "danger", "info", "success", "warning", "danger", "info", "danger"]
        }
      },
    methods: {
			tag(name) {
          this.$emit("tag",name);//自定义事件  传递值“子向父组件传值”
			},
      handleCurrentChange(val) {
          this.listQuery.pageNum = val;
          this.fetchLableList();
      },
      handleSizeChange(val) {
          this.listQuery.pageSize = val;
          this.fetchLableList();
      },
      fetchLableList(){
        getLablePage(this.listQuery).then(res=>{
            this.labes=res.data.records;
            this.total = res.data.total;
        })
      }
		},
    created() {
      this.fetchLableList()
    }
  }
</script>

<style scoped>
	.box-card .item:hover {
		color: #409EFF;
		cursor: pointer;
	}

	.box-card span {
		font-weight: bold;
	}

	.card-icon {
		width: 20px;
		height: 20px;
		margin-right: 10px;
	}

	.tag-item {
    margin-top: 5px;
		margin-right: 10px;
	}
</style>
