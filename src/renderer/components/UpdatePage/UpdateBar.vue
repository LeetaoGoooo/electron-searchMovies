<template>
    <div v-if= "update">
        <div class="alert alert-info" role="alert">
            当前版本<span class="label label-default">{{ current_version}}</span>可升级到<span class="label label-danger">{{ version }}</span>  <a type="button" class="col-sm-1 col-md-1 col-lg-1 btn btn-danger" style="float:right" v-on:click='updateApp'>升级</a>            
        </div>
        <div v-if= "updating">
            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em" v-bind:style="{width: progress_width + '%'}">
                    0%
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Updates from '@/services/updates'
import Utils from '@/services/utils'
import Logs from '@/services/logs'

export default {
  data () {
    return {
      update: false,
      updating: false,
      current_version: '',
      version: '',
      progress_width: 0
    }
  },
  mounted: function () {
    this.current_version = Updates.getLocalVersion()
    Updates.getCurrentVersion().then(this.changeVersion, this.changeVersion)
  },
  methods: {
    updateApp: function () {
      this.updating = true
      Updates.getUpdate().then(this.changeProgrss, this.reportError)
    },
    changeVersion: function (version) {
      if (version) {
        if (this.current_version !== version) {
          this.update = true
          this.version = version
        }
      }
    },
    reportError: function (error) {
      Logs.logError(error)
      console.log(error)
    },
    changeProgrss: function (value) {
      this.progress_width = value
      if (value === 100) {
        this.updating = false
        Utils.showMessage('更新成功!请重启软件')
      }
    }
  }
}
</script>>