"use client";
import React, { useEffect, useState } from "react";
import styles from "./search.module.css";
import { MdSearch } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
const Search = ({ placeholder }) => {
  /* 
  --to implement search without use state hooks we can use this functionality that 
  we make changes on the url to replace it with another url that show the users search about
  with set to the url q mean query and its value and every time we on change the input will change the url and update the ui alone
  then use search params on users page as parameter
  --okay okay okay all thing work done with change the url and search depend on q nice 
  but when type any thing then refresh without delete what typed the search it still and q it still
  to fix it we use state inputValue and save the value of input and on useEffect we check the input value 
  if empty we replace the url to the basic one that will work correctly , we check cause the on change that use handleSearch
  that also reload the component but the inputValue At that time have value not empty so do not re default the url
  but when remove all typed it work nice and delete the q 
  */
  let [inputValue, setInputValue] = useState("");
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  // useDebouncedCallback to wait 300 ms until i finish writing then search to prevent abusing our db request
  // --NOTE we can use search feature with hooks useState only without query in url ,
  // setPageNumber(searchParams.page);
  const handleSearch = useDebouncedCallback((e) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
    // bellow to implement pagination with same implement of search use uel query , by default page is 1
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      if (e.target.value.length > 2) {
        params.set("q", e.target.value);
        params.set("page", 1);
      }
    } else {
      // cause when we not write any thing in search so it should not show any q in url
      params.delete("q");
    }
    // console.log(searchParams.get("q"));
    replace(`${pathname}?${params}`);
  }, 300);

  useEffect(() => {
    // TODO:
    // if user search and still on page 1 of search and refresh , the all page return to the base, we can also add features
    // that when user search and been in page 3 of search then refresh to return page to the base (delete all query in url (page and search))
    // cause now when user search and next page of search then refresh the result still search result and page still until page been 1 cause input value ""
    // then will return the base page || we make it work!!!!!
    if (
      ((searchParams.get("q") === null || inputValue === "") &&
        (searchParams.get("page") === "1"))
      ||
      ((searchParams.get("q") !== null && inputValue === "") &&
        searchParams.get("page") >= "1")
    ) {
      replace(`${pathname}`);
    }
  });

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        // value={inputValue}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
