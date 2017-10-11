<template>
    <div v-if= "update">
        <div class="alert alert-info" role="alert">
            当前版本<span class="label label-default">{{ current_version}}</span>可升级到<span class="label label-danger">{{ version }}</span>  <a type="button" class="col-sm-1 col-md-1 col-lg-1 btn btn-danger" style="float:right" v-on:click='updateApp'>升级</a>            
        </div>
    </div>
</template>
<script>
import Updates from '@/services/updates'

export default {
  data () {
    return {
      update: false,
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
      Updates.getUpdate()
    },
    changeVersion: function (version) {
      console.log(version)
      if (version !== 'NOTFOUND' && version !== 'ETIMEDOUT') {
        this.$emit('NETSTATUS', true)
        if (this.current_version !== version) {
          this.update = true
          this.version = version
        }
      } else {
        this.$emit('NETSTATUS', false)
      }
    }
  }
}
</script>>