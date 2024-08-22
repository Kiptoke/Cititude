<script setup lang="ts">
    const props = defineProps(['city'])
    const supabase = useSupabaseClient()
    const countrycodes = ["US", "CA"]

    const { data: city } = await useAsyncData(props.city, async () => {
        const { data } = await supabase.from('worldcities').select().eq('city', props.city)
        return data![0]
    })

    function degrees(lat: number){
        const hemi = (lat >= 0) ? "N" : "S"
        return Math.abs(lat) + "° " + hemi
    }

    function state(city: string, state: string, iso: string){
        if (state === "" || countrycodes.includes(iso) || state != city){
            return `${state}, `
        }
    }

    function getFlagEmoji(countryCode: string) {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char =>  127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }

</script>

<template>
    <UCard class="m-5">
        <template #header>
            <b class="text-xl">{{ city!.city }}</b>, <i class="text-sm">{{ state(city!.city, city!.admin_name, city!.iso2) }}{{ city!.country }}</i> {{ getFlagEmoji(city!.iso2) }}
        </template>
        <div>
            <p><b>Laditude:</b> {{ degrees(city!.lat) }}</p>
            <p><b>Population:</b> {{ Intl.NumberFormat().format(city!.population) }}</p>
            <p><b>Temperature Now:</b></p>
        </div>
    </UCard>
</template>
