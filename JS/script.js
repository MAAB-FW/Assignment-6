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

const mainCardContainer = document.getElementById('main-card-container')
const loadMainData = async () => {
    searchSpinner.classList.remove('hidden')
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json()
    mainCardContainer.innerHTML = ""
    setTimeout(() => {
        searchSpinner.classList.add('hidden')
        data.posts.forEach(item => {
            // console.log(item);
            const mCard = document.createElement('div')
            mCard.classList = "flex flex-col lg:flex-row gap-6 p-6 lg:p-10 border border-white hover:bg-[rgba(121,125,252,0.1)] hover:border-[#797DFC] bg-[#F3F3F5] rounded-3xl"
            mCard.innerHTML = `
                        <!-- img div -->
                        <div class="flex justify-center">
                            <div class="relative">
                            <div
                                class="absolute lg:flex size-[19px] ${item.isActive ? "bg-[#10B981]" : "bg-[#FF3434]"} rounded-full border-2 right-[-3%] top-[-3%]">
                            </div>
                            <div class="size-[150px] lg:size-[72px] ">
                                <img class="rounded-2xl" src="${item.image}" alt="">
                            </div>
                            </div>
                        </div>
                        <!-- functional part -->
                        <div class="w-full">
                            <div class="font-medium text-sm text-[rgba(18,19,45,0.8)] flex gap-5 mb-3">
                                <span>#${item.category}</span>
                                <p>Author : <span>${item.author.name}</span></p>
                            </div>
                            <div>
                            <h2 class="font-bold text-xl text-[#12132D] mb-4">${item.title}
                            </h2>
                            <p class="text-[rgba(18,19,45,0.6)] border-b-2 border-dashed pb-5 max-w-[569px]">${item.description}</p>
                            </div>
                            <div class="flex items-center justify-between mt-4 lg:mt-7">
                                <div class="text-[rgba(18,19,45,0.6)] flex gap-4 lg:gap-7">
                                    <div class="flex gap-3 items-center">
                                        <i class="fa-regular fa-comments"></i>
                                        <span>${item.comment_count}</span>
                                    </div>
                                    <div class="flex gap-3 items-center">
                                        <i class="fa-regular fa-eye"></i>
                                        <span>${item.view_count}</span>
                                    </div>
                                    <div class="flex gap-3 items-center">
                                        <i class="fa-regular fa-clock"></i>
                                        <span>${item.posted_time}</span>
                                    </div>
                                </div>
                                <button onclick="markRead('${item.title.replace("'", " ")}', '${item.view_count}')" class=" btn btn-sm btn-circle text-white bg-[#10B981] rounded-full">
                                    <i class="fa-solid fa-envelope-circle-check"></i></button>
                            </div>
                        </div>
                    
        `
            mainCardContainer.appendChild(mCard)
        })
    }, 2000)
}

const markReadContainer = document.getElementById('mark-read-container')
const countClick = document.getElementById('count-click')
countClick.innerText = "0"
markReadContainer.innerHTML = ""
let count = 0
const markRead = (title, viewC) => {
    count++
    countClick.innerText = count
    console.log(title, viewC);
    const markDiv = document.createElement('div')
    markDiv.classList = "p-[15px] bg-white rounded-2xl flex gap-[5px] items-center justify-between"
    markDiv.innerHTML = `
    <h3 class="font-semibold text-[#12132D]">${title}</h3>
    <div class="flex gap-3 items-center text-[rgba(18,19,45,0.6)]">
    <i class="fa-regular fa-eye"></i>
    <span>${viewC}</span>
    </div>
    `
    markReadContainer.appendChild(markDiv)
}

const searchInput = document.getElementById('search-input')

const searchButton = () => {
    const searchV = searchInput.value
    // console.log('cliked');
    loadSearchData(searchV)
    searchInput.value = ""
}
const searchSpinner = document.getElementById('spinner')
const loadSearchData = async (searchValue) => {
    searchSpinner.classList.remove('hidden')
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`)
    const data = await res.json()
    mainCardContainer.innerHTML = ""
    // console.log(data.posts);
    setTimeout(() => {
        searchSpinner.classList.add('hidden')
        data.posts.forEach(item => {
            const mCard = document.createElement('div')
            mCard.classList = "flex flex-col lg:flex-row gap-6 p-6 lg:p-10 border border-white hover:bg-[rgba(121,125,252,0.1)] hover:border-[#797DFC] bg-[#F3F3F5] rounded-3xl"
            mCard.innerHTML = `
                        <!-- img div -->
                        <div class="relative flex justify-center">
                            <div
                                class="absolute hidden lg:flex size-[19px] ${item.isActive ? "bg-[#10B981]" : "bg-[#FF3434]"} rounded-full border-2 right-[-3%] top-[-3%]">
                            </div>
                            <div class="size-[230px] lg:size-[72px] ">
                                <img class="rounded-2xl" src="${item.image}" alt="">
                            </div>
                        </div>
                        <!-- functional part -->
                        <div class="w-full">
                            <div class="font-medium text-sm text-[rgba(18,19,45,0.8)] flex gap-5 mb-3">
                                <span>#${item.category}</span>
                                <p>Author : <span>${item.author.name}</span></p>
                            </div>
                            <div>
                            <h2 class="font-bold text-xl text-[#12132D] mb-4">${item.title}
                            </h2>
                            <p class="text-[rgba(18,19,45,0.6)] border-b-2 border-dashed pb-5 max-w-[569px]">${item.description}</p>
                            </div>
                            <div class="flex items-center justify-between mt-4 lg:mt-7">
                                <div class="text-[rgba(18,19,45,0.6)] flex gap-4 lg:gap-7">
                                    <div class="flex gap-3 items-center">
                                        <i class="fa-regular fa-comments"></i>
                                        <span>${item.comment_count}</span>
                                    </div>
                                    <div class="flex gap-3 items-center">
                                        <i class="fa-regular fa-eye"></i>
                                        <span>${item.view_count}</span>
                                    </div>
                                    <div class="flex gap-3 items-center">
                                        <i class="fa-regular fa-clock"></i>
                                        <span>${item.posted_time}</span>
                                    </div>
                                </div>
                                <button onclick="markRead('${item.title.replace("'", " ")}', '${item.view_count}')" class=" btn btn-sm btn-circle text-white bg-[#10B981] rounded-full">
                                    <i class="fa-solid fa-envelope-circle-check"></i></button>
                            </div>
                        </div>
        `
            mainCardContainer.appendChild(mCard)
        })
    }, 2000)
}

loadMainData()