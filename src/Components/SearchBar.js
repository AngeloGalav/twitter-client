import React from 'react'

export const SearchBar = () => {
    return (
        <div class="relative">
            <form action="/tweets" method="get">
                <input
                    type="text"
                    placeholder="Search"
                    class="w-full pr-16 input input-primary input-bordered"
                    name="keyword"/>
                <button
                    type="submit"
                    class="absolute top-0 right-0 rounded-l-none btn btn-primary">
                    go
                </button>
            </form>
        </div>
    )
}

export default SearchBar;
