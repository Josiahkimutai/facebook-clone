import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://cpmzvqcoiknotpcutljh.supabase.co'
const supabaseKey = 'sb_publishable_iWUiLtL50Ptcm5sYVBUSvA_U7WyfV-f'

const supabase = createClient(supabaseUrl, supabaseKey)

window.createPost = async function () {

    const content = document.getElementById('postContent').value

    if (!content) {
        alert("Please write something")
        return
    }

    const { error } = await supabase
        .from('posts')
        .insert([{ content }])

    if (error) {

        alert("Post failed")
        console.log(error)

    } else {

        alert("Post Success")

        document.getElementById('postContent').value = ''

        loadPosts()
    }
}

async function loadPosts() {

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
        return
    }

    const postsDiv = document.getElementById('posts')

    postsDiv.innerHTML = ''

    data.forEach(post => {

        postsDiv.innerHTML += `
            <div class="post">
                ${post.content}
            </div>
        `
    })
}

loadPosts()