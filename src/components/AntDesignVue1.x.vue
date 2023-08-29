<template>
  <div>
    <h3>AntDesignVue1.x</h3>
    <div class="row flex">
      <span class="title text-1">此为自定义颜色变量，切换主题色时，根据需求，切换变量</span>
      <div class="card card-success m-l-10">自定义成功色</div>
      <div class="card m-l-10 card-error">自定义失败色</div>
      <div class="card m-l-10 card-font">自定义文字颜色</div>
      <div class="card m-l-10 card-border">自定义border颜色</div>
    </div>
    <div class="row">以下是组件库</div>
    <div class="row">
      <a-button type="primary">
        Primary
      </a-button>
      <a-button type="danger" class="m-l-10">
        Primary
      </a-button>
      <a-radio-group :default-value="1" class="m-l-10">
        <a-radio :value="1">
          A
        </a-radio>
        <a-radio :value="2">
          B
        </a-radio>
      </a-radio-group>
    </div>
    <div class="row">
      <a-input-search placeholder="input search text" style="width: 200px" />
      <a-date-picker class="m-l-10" />
      <a-select default-value="lucy" style="width: 120px" class="m-l-10">
        <a-select-option value="jack">
          Jack
        </a-select-option>
        <a-select-option value="lucy">
          Lucy
        </a-select-option>
      </a-select>
    </div>
    <div class="row">
      <a-radio-group default-value="a">
        <a-radio-button value="a">
          Hangzhou
        </a-radio-button>
        <a-radio-button value="b">
          Shanghai
        </a-radio-button>
      </a-radio-group>

      <a-radio-group default-value="a" button-style="solid" class="m-l-10">
        <a-radio-button value="a">
          Hangzhou
        </a-radio-button>
        <a-radio-button value="b">
          Shanghai
        </a-radio-button>
      </a-radio-group>
    </div>
    <div class="row">

    </div>

    <div class="row">

    </div>

    <div class="row">
      <a-tag>Tag 1</a-tag>
      <a-tag color="pink">
        pink
      </a-tag>
      <a-tag color="red">
        red
      </a-tag>
      <a-tag color="orange">
        orange
      </a-tag>
      <a-tag color="green">
        green
      </a-tag>
    </div>

    <div class="row">
      <a-table :columns="columns" :data-source="data">
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
    </div>

    <div class="row">
      <a-steps :current="1">
        <a-step>
          <!-- <span slot="title">Finished</span> -->
          <template slot="title">
            Finished
          </template>
          <span slot="description">This is a description.</span>
        </a-step>
        <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
        <a-step title="Waiting" description="This is a description." />
      </a-steps>
    </div>

  </div>
</template>

<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column Long Column',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: 'Long Column Long Column',
    dataIndex: 'address',
    key: 'address 3',
    ellipsis: true,
  },
  {
    title: 'Long Column',
    dataIndex: 'address',
    key: 'address 4',
    ellipsis: true,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
];

export default {
  data() {
    return {
      data,
      columns,
    }
  },
  created() { },
  methods: {},
}
</script>

<style lang='less' scoped>
.flex {
  display: flex;
}

.row {
  margin-bottom: 20px;
}

.title {
  // color: @primary-color;
}

.m-l-10 {
  margin-left: 10px
}

.card {
  width: 50px;
  line-height: 30px;
}

.card-success {
  background-color: var(--custom-success-color);
}

.card-error {
  background-color: var(--custom-error-color);
}

.card-font {
  color: var(--custom-text-color);
}

.card-border {
  border: 1px solid var(--custom-border-color);
}
</style>