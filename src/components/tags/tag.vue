<template>
	<div class="tag">
		<el-card class="box-card">
			<div slot="header" class="d-flex align-items-center">
				<img class="card-icon" src="@/assets/biaoqian.png" />
				<span>标签</span>
			</div>
			<div class="text item">
        <el-tag size="mini" class="tag-item"  v-for="(item,index) in labes" :key="index" :type="types[index]" @click="tag(item)">{{item.labelName}}[{{item.count}}]</el-tag>
        <el-tag size="mini" class="tag-item"  @click="sendMessage()">开始搜索</el-tag>
        <el-tag size="mini" class="tag-item"  @click="flush()">重新赛选</el-tag>
      </div>
      <el-divider content-position="left">当前已选中</el-divider>
      <div>
        <el-tag size="mini" class="tag-item" v-for="(item,index) in chickedlables" :key="index">{{item.labelName}}</el-tag>
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
          chickedlables:[],
          labesId:[],
          listQuery: {
              pageNum: 1,
              pageSize: 10
          },
          total:0,
          types:["success", "info", "warning", "warning", "danger", "info", "success", "warning", "danger", "info", "danger"]
        }
      },
    methods: {
      tag(item) {
        if (this.chickedlables.length<5){
          for(var i=0;i<this.chickedlables.length;i++){
            if (item.labelId===this.chickedlables[i].labelId){
              this.$alert("Duplicate values cannot be added!","info",{
                confirmButtonText: 'ok'
              })
              return
            }
          }
          this.chickedlables.push(item);
        }else {
          this.$alert("Maximum 5 labels!","info",{
            confirmButtonText: 'ok'
          })
        }
        this.labesId.push(item.labelId)
      },
      sendMessage(){
        this.$emit('tag',this.labesId)
      },
      flush(){
        this.labesId=[];
        this.chickedlables=[];
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.fetchLableList();
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val;
        this.fetchLableList();
      },
      fetchLableList() {
        getLablePage(this.listQuery).then(res => {
          this.labes = res.data.records;
          this.total = res.data.total;
        })
      },
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
  .tag-item:active{
    background-color: #aae1ee;
  }

</style>
