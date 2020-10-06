<template>
    <div class="loading" v-show="isshow">
        <div class="loading_content">
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
            <div class="loading_item">
                <div class="loading_line"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"loading",
    props:{
        isshow:{
            type:Boolean,
            default:false
        }

    }
}
</script>

<style scoped>
    .loading{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #000;
        opacity: 0.6;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loading_content{
        position: relative;
        width: 200px;
        height: 200px;
    }
    .loading_item{
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
    .loading_line{
        position: absolute;
        top: 0;
        left: 99px;
        width: 2px;
        height: 60px;
        background: #409eff;
        animation: loading 1.2s infinite linear;

    }
    .loading_item:nth-child(1){
        transform: rotateZ(0deg);
    }
    .loading_item:nth-child(2){
        transform: rotateZ(30deg);
    }
    .loading_item:nth-child(3){
        transform: rotateZ(60deg);
    }
    .loading_item:nth-child(4){
        transform: rotateZ(90deg);
    }
    .loading_item:nth-child(5){
        transform: rotateZ(120deg);
    }
    .loading_item:nth-child(6){
        transform: rotateZ(150deg);
    }
    .loading_item:nth-child(7){
        transform: rotateZ(180deg);
    }
    .loading_item:nth-child(8){
        transform: rotateZ(210deg);
    }
    .loading_item:nth-child(9){
        transform: rotateZ(240deg);
    }
    .loading_item:nth-child(10){
        transform: rotateZ(270deg);
    }
    .loading_item:nth-child(11){
        transform: rotateZ(300deg);
    }
    .loading_item:nth-child(12){
        transform: rotateZ(330deg);
    }

    .loading_item:nth-child(1) .loading_line{
        animation-delay: 0ms;
    }
    .loading_item:nth-child(2) .loading_line{
        animation-delay: 100ms;
    }.loading_item:nth-child(3) .loading_line{
        animation-delay: 200ms;
    }.loading_item:nth-child(4) .loading_line{
        animation-delay: 300ms;
    }.loading_item:nth-child(5) .loading_line{
        animation-delay: 400ms;
    }.loading_item:nth-child(6) .loading_line{
        animation-delay: 500ms;
    }.loading_item:nth-child(7) .loading_line{
        animation-delay: 600ms;
    }.loading_item:nth-child(8) .loading_line{
        animation-delay: 700ms;
    }.loading_item:nth-child(9) .loading_line{
        animation-delay: 800ms;
    }.loading_item:nth-child(10) .loading_line{
        animation-delay: 900ms;
    }
    .loading_item:nth-child(11) .loading_line{
        animation-delay: 1000ms;
    }
    .loading_item:nth-child(12) .loading_line{
        animation-delay: 1100ms;
    }


    @keyframes loading{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
</style>