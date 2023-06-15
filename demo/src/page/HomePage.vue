<template>
  <div class="homeContainer">
    <el-header style="text-align: right; font-size: 12px"></el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu v-for="(item, index) in listData" :key="index">
          <el-menu-item :index="index">
            <template slot="title">{{ item }}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main" style="display: flex;flex-direction: column;">
        <div style="width: 60%;">
          <!-- <div v-for="(item,index) in tableData" :key="index+a"
            style="width: 100%;">
            <div style="display: flex;justify-content: space-between;width: 100%;">
              <div>{{item.Serial_Number}}</div>
              <div>open</div>
            </div>
            <div style="display: none">
              <div v-for="(i,index) in item" :key="index+b">
                <div>{{i}}</div>
              </div>
            </div>
          </div> -->
          <!-- 当前设备各硬件总信息 -->
          <div v-for="(value,key) in obj" :key="key">
            <!-- 每个硬件详细信息 -->
            <div v-for="(item,index) in value" :key="item" style="width: 100%;">
              <div style="display: flex;justify-content: space-between;width: 100%;">
                <!-- 硬件名称 -->
                <div>{{key}}{{index+1}}</div>
                <div>open</div>
              </div>
              <!-- 赋ID -->
              <div style="display: none;width: 90%;">
                <!-- 硬件信息 -->
                <div v-for="(value,name,index) in item" :key="index+b" style="display: flex;justify-content: space-between;">
                  <div style="margin-right: 20px;">{{name}}</div><div>{{value}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tableNew" style="width: 100%;display: none;">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="Serial_Number" label="" width="180">
            </el-table-column>
            <el-table-column prop="BAsset_Tag" label="BogoMIPS" width="180">
            </el-table-column>
            <el-table-column prop="Locator" label="CPU(s)">
            </el-table-column>
            <el-table-column prop="Locator" label="L1dcache">
            </el-table-column>
            <el-table-column prop="Locator" label="L1icache">
            </el-table-column>
            <el-table-column prop="Locator" label="L2cache">
            </el-table-column>
          </el-table>
        </div>
        <el-card class="box-card" v-for="(item,index) in arrData" :key="index+'a'">
          <div slot="header" class="clearfix">
            <span>device_info:{{ item.device_info }}</span>
          </div>
          <div class="mb-10">
            BMC_IP:{{ item.bmc_ip }}
          </div>
          <div>
            OS_IP:{{ item.host_ip }}
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>


<style>
  body {
    background-color: F1FAFA;
  }

  .homeContainer {
    height: calc(100vh)
  }

  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .el-container {
    /* height: calc(100vh - 60px); */
  }

  .el-menu {
    border: none;
  }

  .el-aside {
    color: #333;
    height: calc(100vh - 60px);
  }

  .box-card {
    width: 25%;
  }

  .main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .el-card {
    box-shadow: 0px 5px 20px 0px rgb(0 0 0 / 30%) !important;
    border-radius: 30px;
  }

  .el-card:hover {
    box-shadow: 0px 5px 12px 0px #336699 !important;
  }
</style>

<script>
  import axios from "axios";

  export default {
    name: "HomePage",
    data() {
      return {
        tableData: [],
        listData: [],
        arrData: [],
        obj: {}
      };
    },
    created() {
      axios.get("http://192.168.1.7:8888/device_info/").then((res) => {
        console.log(res)
        this.tableData = res.data.memory_info
        this.obj = res.data
      });
    },
    mounted() {
      axios.get("http://192.168.1.2:8888/device_type/").then((res) => {
        console.log(res);
        this.listData = res.data;
        console.log(this.arrData);
      });
      axios.get("http://192.168.1.2:8888/device_info/").then((res) => {
        console.log(res);
        this.arrData = res.data[0]['PTG-23'];
        console.log(this.arrData);
      });

      console.log("mounted");
      console.log(this.arrData);
      console.log('https://blog.csdn.net/weixin_44279243/article/details/121172966')
    },
  };
</script>