import React from 'react'

export const SearchBar = () => {
    return (
        <div class="relative">
            <input type="text" placeholder="Search" class="w-full pr-16 input input-primary input-bordered "></input>
            <button class="absolute top-0 right-0 rounded-l-none btn btn-primary">go</button>
        </div>
    )
}

export default SearchBar;