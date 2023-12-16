<script lang="ts">
import "~/assets/css/header.css";
</script>
<template>
    <header class="header">
        <div class="menu">
            <div class="menu-icon">
                <LucideMenu :size="33" />
            </div>

        </div>    
        <div class="logo">
            <h1>YouTube X</h1>
        </div>
        <div class="search">
            <input type="text" placeholder="Search ..."/>
        </div>

        

        <div class="account">
            <div class="account-icon">
                <LucideUserCircle2 :size="33" />
            </div>
            <div class="account-sign-in">
                <span>Sign in</span>
                </div>
        </div>
    </header>
</template>