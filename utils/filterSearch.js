const filterSearch = ({router, page, category, sort, search, ref}) => {
    const path = router.pathname;
    const query = router.query;

  //  console.log({path, query})

    if(category) query.category = category;
    if(page) query.page = page;
    if(search) query.search = search;
    if(sort) query.sort = sort;
    if(ref) query.ref = ref;

    router.push({
        pathname: path,
        query: query
    })
}

export default filterSearch;