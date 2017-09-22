<template>
<div style="margin-top:5%">
    <div class="form-horizontal">
        <div class="form-group">
            <div class="col-sm-6 col-md-6 col-lg-6 col-md-offset-2 col-sm-offset-2 col-lg-offset-2">
                <input type="text" class="form-control" ref="movie_name" value="" placeholder="要搜索的电影名称">
            </div>
            <button type="button" ref="search_btn" class="col-sm-2 col-md-2 col-lg-2 btn btn-primary" data-loading-text="正在查询..." autocomplete="off" v-on:click='searchMovies'>Search</button>            
        </div>
    </div>
    <div v-if="loading">
      <progress-bar></progress-bar>
    </div>
	<div class="panel panel-default" v-if="searchList.length">
		<div class="panel-heading">查询结果</div>
		<ul class="list-group">
			<a class="list-group-item" v-for="item in searchList"  v-on:click="copyUrl(item.href)">{{ item.text }}</a>
		</ul>
	</div>
  <div class="well" v-else style="margin-top:20%">
    <div class="media">
      <div class="media-left">
        <a href="#">
          <img class="media-object" src="https://avatars1.githubusercontent.com/u/10162120?v=4&s=460" alt="Leetao" style="width:64px;height:64px">
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading"><span class="label label-success">作者</span>: Leetao</h4>
        <p><span class="label label-success">项目名称</span>: searchMovies</p>
        <p><span class="label label-success">项目描述</span>: 为了避免在查找电影中遭遇的各种广告</p>
        <p><span class="label label-success">项目地址</span>: https://github.com/lt94/electron-searchMovies.git</p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Searchs from '@/services/searchs'
import Utils from '@/services/utils'
import Logs from '@/services/logs'
import ProgressBar from '../ProgressPage/ProgressBar'

export default {
  components: { ProgressBar },
  data () {
    return {
      loading: false,
      searchList: []
    }
  },
  methods: {
    searchMovies: function () {
      var movieName = this.$refs.movie_name.value
      this.loading = true
      Searchs.search(movieName).then(this.changeSearchList, this.reportError)
    },
    changeSearchList: function (data) {
      this.searchList = data
      this.loading = false
    },
    reportError: function (error) {
      console.log(error)
      Logs.logError(error)
    },
    copyUrl: function (href) {
      Utils.copy2Board(href)
      Utils.showMessage('复制成功')
    }
  }
}
</script>>