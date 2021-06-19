.<template>
    <div>
        <div>首页</div>
        <item-component />
    </div>
</template>

<script>
    import Item from './Itme';
    export default {
    components: { itemComponent: Item},
      data() {
        return {
            itemComponent:Item,
        }
      },
        methods: {
            forss() {
                for (let i = 1; i <= 1000; i++) {
                    this.data.push({
                        key: i,
                        value: i + '测试数'
                    })
                }
            },

        },
        mounted() {
            this.forss();
        }
    }
</script>
