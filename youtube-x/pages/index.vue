<script lang="ts" setup>
import "~/assets/css/main.css"

const { data: cards } = await useFetch('/api/popular')
</script>
 <template>
    <div>
        <h1 class="identifier">Popular Videos</h1>
        <div class="card">
            {{ cards }}
        </div>
        </div>
</template>