import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://cpmzvqcoiknotpcutljh.supabase.co'

const supabaseKey = 'sb_publishable_iWUiLtL50Ptcm5sYVBUSvA_U7WyfV-f'

const supabase = createClient(supabaseUrl, supabaseKey)

window.signUp = async function () {

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const { error } = await supabase.auth.signUp({
        email,
        password
    })

    if (error) {
        alert(error.message)
    } else {
        alert("Signup successful")
    }
}

window.login = async function () {

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        alert(error.message)
    } else {
        alert("Login successful")
    }
}

window.logout = async function () {

    await supabase.auth.signOut()

    alert("Logged out")
}

window.createPost = async function () {

    const content = document.getElementById('postContent').value

    if (!content) {
        alert("Write something")
        return
    }

    const user = await supabase.auth.getUser()

    if (!user.data.user) {
        alert("Please login first")
        return
    }

    const { error } = await supabase
        .from('posts')
        .insert([{
            content
        }])

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
        .order('id', { ascending: false })

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