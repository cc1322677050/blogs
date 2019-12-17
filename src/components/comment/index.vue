<template>
    <el-card :bordered="false">
      <el-col :md="24" :sm="24" style="margin-top: 10px">
        <el-input title="评论内容" :placeholder="placeholder" v-model="commentcommentContent" style="width: 650px"/>
      </el-col>
      <div style="text-align: right;margin-top: 1%">
        <el-button v-if="isResponsible" title="取消回复" @click="deleteRespond()" size="mini">取消回复</el-button>
        <el-button @click="giveComment()" title="发表评论" type="primary" style="margin-right: 18px" size="mini">发表评论</el-button>
      </div>
      <div v-for="(item, index) in comments" style="margin-top: 20px" :key="index">
        <div
          @mouseout="showCommentButton(0,item.commentId)"
          @mouseover="showCommentButton(1, item.commentId)">
          <el-avatar title="用户头像" type="user" style="padding-right: 3px; text-align: center" :src="item.userProfilePhoto"></el-avatar>
          <span>
            {{item.userNickname}}:
          </span>
          <span title="评论内容">{{ item.commentContent }}</span>
          <span style="padding-left: 10px; color: lightgrey" title="时间">({{ item.commentDate }} &nbsp; #{{index + 1}}楼)</span>
          <span
            :id="item.commentId"
            style="margin-left: 5px; display: none">
            <a @click="replying(item, index)" title="回复" style="color: #3a87ad; font-size: smaller;">回复</a>
            <span v-if="item.reply.length !== 0">
              <a :id="item.commentId + 'e'" @click="checkingReply(1, item.commentId)" title="查看回复" style="color: #3a87ad;  font-size: smaller;">查看回复 ({{item.reply.length}})</a>
              <a :id="item.commentId + 'c'" @click="checkingReply(2, item.commentId)"
                 style="color: #3a87ad; font-size: smaller; display: none" title="收起回复">收起回复</a>
            </span>
          </span>
        </div>
        <Reply
          title="子组件"
          :class="item.commentId + 'r'"
          style="margin: 0 0 0 20px;border-left: double 4px darkgray; padding-right: 3px; display: none"
          @listenToChild="getDataFromChild"
          :who="item.userNickname"
          :replies="item.reply">
        </Reply>
        <el-divider/>
      </div>
    </el-card>
</template>
<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import 'ant-design-vue/lib/table/style/css'
  import moment from 'moment'
  import Reply from '@/components/comment/reply/index'
  import {getCommentByArticleId,saveComment} from "@/api/comment"
  import {formatTimeToStr} from '@/utils/date';

  export default {
    name: 'TestCommentModel',
    components: {Reply, Vue},
    props:{
      articleIds:""
    },
    data () {
      return {
        name: this.$store.getters.nickname,
        commentcommentContent: '',
        moment,
        comment: {},
        index: undefined,
        placeholder: '想对博主说些什么...',
        pid:undefined,
        visible: false,
        isResponsible: false,
        confirmLoading: false,
        comments: [],
        reply: ''
      }
    },
    mounted () {
    },
    created () {
      let _this = this
      _this.init()
      this.treeComments()
    },
    methods: {
      treeComments(){
        getCommentByArticleId(this.articleIds).then(res=>{
          this.comments=res.data
        })
      },
      init () {
      },
      // 其它模块可以调用此方法来开启组件
      show () {
        let _this = this
        _this.visible = true
      },
      // 显示可操作回复按钮
      showCommentButton (code, id) {
        if (code === 0) {
          $(function () {
            $('#' + id).hide()
          })
        } else {
          $(function () {
            $('#' + id).show()
          })
        }
      },
      // 回复方法
      replying (item, index) {
        let _this = this;
        _this.pid=item.commentId;
        _this.isResponsible = true;
        _this.index = index;
        _this.comment = item;
        _this.commentcommentContent = ''
        _this.placeholder = '回复: ' + item.userNickname + ' : ' + item.commentContent
      },
      // 取消回复
      deleteRespond () {
        let _this = this
        _this.isResponsible = false
        _this.commentcommentContent = ''
        _this.comment = {}
        _this.placeholder = '想对博主说点什么...'
      },
      // 查看回复
      checkingReply (code, id) {
        if (code === 1) {
          $(function () {
            $('#' + id + 'e').hide()
            $('#' + id + 'c').show()
            $('.' + id + 'r').show()
          })
        } else {
          $('#' + id + 'e').show()
          $('#' + id + 'c').hide()
          $('.' + id + 'r').hide()
        }
      },
      // 发表评论
      giveComment () {
        let _this = this
        let articleIds=this.articleIds
        if(this.pid===undefined){
          this.pid=0
        }

        let comment = {
          commentId: Math.floor(Math.random() * 1000 + 1000),
          userId:this.$store.getters.userId,
          articleId:articleIds,//获取文章的Id
          userProfilePhoto:this.$store.getters.avatar,//获取头像
          userNickname: this.$store.getters.nickname,//获取昵称
          commentContent: _this.commentcommentContent,
          parentCommentId: this.pid,//父id
          commentDate: formatTimeToStr(new Date(), "yyyy-MM-dd hh:mm:ss"),
          reply: []
        }
        this.pid=undefined
        saveComment(comment).then(res=>{
          comment.commentId=res.data
          console.log(comment)
          if (!_this.isResponsible) {
            _this.comments.push(comment)
          } else {
            _this.comment.reply.push(comment)
          }
          _this.commentcommentContent = ''
          _this.name = ''
          _this.autoExpandComment(_this.comment.commentId)
        })

      },
      // 评论后,默认展开子节点
      autoExpandComment (id) {
        $(function () {
          $('#' + id + 'e').hide()
          $('#' + id + 'c').show()
          $('.' + id + 'r').show()
        })
      },
      // 父子组件通信的方法
      getDataFromChild (item, index) {
        let _this = this
        _this.index = index
        _this.isResponsible = true
        _this.replying(item, index)
      }
    }
  }
</script>

<style scoped>

</style>
