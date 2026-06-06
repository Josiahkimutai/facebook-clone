import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://pzrdyjpvueannxtpstlt.supabase.co'
const supabaseKey = 'sb_publishable_YpYLHHbRQ6u084gqC32lSg_f1tM3mmJ'

const supabase = createClient(supabaseUrl, supabaseKey)

/* LOAD POSTS */
async function loadPosts() {

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

    const postsDiv = document.getElementById('posts')

    postsDiv.innerHTML = ''

    if(error){

        console.log(error)
        return
    }

    data.forEach(post => {

        postsDiv.innerHTML += `

        <div class="post">

            <h3>User</h3>

            <p>${post.content}</p>

            <small>${new Date(post.created_at).toLocaleString()}</small>

        </div>

        `
    })
}

/* CREATE POST */
window.createPost = async function () {

    const content = document.getElementById('postInput').value

    if(content.trim() === '') return

    const {
        data: { user }
    } = await supabase.auth.getUser()

    const { error } = await supabase
        .from('posts')
        .insert([
            {
                user_id: user.id,
                content: content
            }
        ])

    if(error){

        alert(error.message)

    }else{

        document.getElementById('postInput').value = ''

        loadPosts()
    }
}

/* LOAD POSTS */
loadPosts()