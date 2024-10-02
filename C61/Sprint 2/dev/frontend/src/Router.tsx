// import { React } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// The QueryClient can be used to interact with a cache ; qc-provider needs an instance of queryclient
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity,
      },
    },
  });
    
//  Context lets components pass information deep down without explicitly passing props.  
          {/* <AdoptedPetContext.Provider value = {adoptedPet}> */}

<BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/">Green Flag</Link>
          </header>
          <Routes>
            <Route path="/home" />
            {/* element={<SearchParams />}  here WE ADD A COMPONENT: */ }
            <Route path="/" />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>