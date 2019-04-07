<template>
    <div class="stars-container" :style="{fontSize: fontSize}">
        <div
            class="max-stars"
            @mousemove="onMouseMove"
            @mouseover="isMouseOver=true"
            @mouseleave="isMouseOver=false"
            @click="onClick"
        >{{starsString}}</div>
        <div
            class="stars"
            :style="{
                width: starsWidth,
                color: isMouseOver?'#fe1':'#fd0',
                textShadow: isMouseOver?' 0 0 .33em #ff5':'0 0 .3em #ff0'
            }"
            @mousemove="onMouseMove"
            @mouseover="isMouseOver=true"
            @mouseleave="isMouseOver=false"
            @click="onClick"

        >{{starsString}}</div>
        <input type="hidden" :name="name" :value="newValue" />
    </div>
</template>

<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'
    import Component from 'vue-class-component'
    import {Prop} from 'vue-property-decorator' 
    
    @Component({
        components: {
        }
    } as ComponentOptions<Vue>)
    
    export default class StarsSelector extends Vue {
        
        // props
        @Prop({default: ''}) readonly name: string
        @Prop({default: false}) readonly readonly: boolean
        @Prop({default: 0}) readonly value: number
        @Prop({default: 0.5}) readonly min: number
        @Prop({default: 7}) readonly max: number
        @Prop({default: 0.5}) readonly step: number
        @Prop({default: '★'}) readonly starSymbol: string
        @Prop({default: '24pt'}) readonly fontSize: string
        
        // data
        newValue:number = 0
        maxWidth:number = 0
        isMouseOver:boolean = false
        mouseStars:number = 0

        // computed
        get starsString() {
            let starsString = ''
            let iii = 0
            while(iii<this.max) {
                starsString+=this.starSymbol
                iii++
            }
            return starsString
        }

        get starsWidth() {
            if (!this.readonly&&this.isMouseOver) {
                return Math.floor(this.mouseStars * this.maxWidth / this.max) + 'px'  
            } else {
                return Math.floor(this.newValue * this.maxWidth / this.max) + 'px'
            }
        }

        // methods
        onMouseMove(event) {
            this.mouseStars = this.validateValue((event.clientX-event.target.getBoundingClientRect().left)/this.maxWidth*this.max)
        }

        onClick() {
            if (!this.readonly) {
                this.newValue = this.mouseStars
                this.$emit('select', this.newValue)
            }
        }

        validateValue(value) {
            let validValue = Math.round((value/this.step))*this.step
            if (validValue<this.min) validValue = this.min
            if (validValue>this.max) validValue = this.max
            return validValue
        }

        mounted() {
            this.newValue = this.validateValue(this.value)
            this.maxWidth = this.$el.querySelector('.max-stars').clientWidth
        }

    }
</script>

<style scoped lang="scss">
    .stars-container {
        position: relative;
        display: inline-block;
    }
    .max-stars, .stars {
        cursor: pointer;
        font-family: monospace;
    }
    .max-stars {
        width: auto;
        color: #555;
        text-shadow: 0 0 3px #222;
    }
    .stars {
        overflow: hidden;
        color: #fd0;
        text-shadow: 0 0 .3em #ff0;
        position: absolute;
        top: 0px;
        left: 0px;
    }
</style>