/* API
// LatestPosts: - https://openapi.programming-hero.com/api/retro-forum/latest-posts

AllPosts: - https://openapi.programming-hero.com/api/retro-forum/posts

// PostSearchByQuery
PostByQuery: - https://openapi.programming-hero.com/api/retro-forum/posts?category=categoryName

Example
PostByQuery: - https://openapi.programming-hero.com/api/retro-forum/posts?category=coding */

const latestPostContainer = document.getElementById('latest-post-container')
const loadLatestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    const data = await res.json()
    latestPostContainer.innerHTML = ""
    data.forEach(item => {
        const postCard = document.createElement('div')
        postCard.classList = "flex flex-col gap-6 p-6 bg-white border rounded-3xl"
        postCard.innerHTML = `
        <!-- img div -->
                    <div class="flex justify-center">
                        <div class=" w-[326px] h-[190px] mb-6">
                            <img class="rounded-[20px]" src="${item.cover_image}" alt="">
                        </div>
                    </div>
                    <!-- functional part -->
                    <div class="flex flex-col justify-between">
                        <div class="text-sm text-[rgba(18,19,45,0.6)] flex gap-3 mb-3">
                            <div class="flex gap-3 items-center">
                                <i class="fa-regular fa-calendar"></i>
                                <span>${item.author.posted_date || "No Publish Date"}</span>
                            </div>
                        </div>
                        <div>
                        <h2 class="font-bold text-lg lg:text-2xl text-[#12132D] mb-3">${item.title}
                        </h2>
                        <p class="text-[rgba(18,19,45,0.6)] max-w-[309px]">${item.description}</p>
                        </div>
                        <div class="flex gap-4 items-center mt-4">
                            <div class="size-[44px]"><img class="rounded-full" src="${item.profile_image}" alt=""></div>
                            <div>
                                <h3 class="font-bold text-[#12132D]">${item.author.name}</h3>
                                <p class="text-[rgba(18,19,45,0.6)]">${item.author.designation || "Unknown"}</p>
                            </div>
                        </div>
                    </div>
        `
        latestPostContainer.appendChild(postCard)
    })
}

loadLatestPosts()

