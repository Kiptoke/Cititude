<script setup lang="ts">
    import type { FormError, FormSubmitEvent } from '#ui/types'
    const supabase = useSupabaseClient()

    const state = reactive({
        city: undefined,
    })

    const validate = (state: any): FormError[] => {
        const errors = []
        if (!state.city) errors.push({ path: 'city', message: 'Required' })
        return errors
    }

    async function onSubmit (event: FormSubmitEvent<any>) {
        const cityescape = encodeURIComponent(event.data.city)
        console.log(`Searching for ${cityescape}`)

        // Call to Nominatim
        const { data, pending, refresh, error } = await useJsonPlaceholderData('search?q=' + cityescape + "&format=json") 

        const citysearch = data.value[0]
        console.log(citysearch)

        // PostGIS call to Supabase
        const { data: closest } = await useAsyncData("closest", async () => {
            const { data, error } = await supabase.rpc('closest_lat', {
                lat: citysearch.lat,
            })
            return data
        })
        
        console.log(closest.value)
    }
</script>

<template>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="What city do you want to compare to?" name="city">
        <UInput v-model="state.city" />
        </UFormGroup>

        <UButton type="submit">
        Search
        </UButton>
     </UForm>
</template>