<template >
  <div class="flex flex-col items-center text-center ">
    <header>
      <HelloWorld />
      <div class="flex">
        <div class="flex w-48 justify-center items-center">
          <RouterLink to="/home" class="flex ">新建</RouterLink>
        </div>
        <div class="flex w-48 justify-center items-center">
          <RouterLink to="/home/two" class="flex ">我的</RouterLink>
        </div>
      </div>
    </header>
  </div>

  <RouterView />
</template>
