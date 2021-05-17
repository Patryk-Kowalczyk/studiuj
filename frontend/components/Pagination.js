import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import {useQuery} from '@apollo/client';
import styled from 'styled-components';
import {IoArrowBack, IoArrowForward} from 'react-icons/io5'
import IconButton from '@material-ui/core/IconButton';

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid var(--lightGray);
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid var(--lightGray);
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
    text-decoration: none;
  }
  a{
    height: 100%;
    width:100%;
    margin:0;
    padding:0;
  }
  p{
  font-size: 14px;
  }

`;

export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        advertisements(first:5,page:1){
            data{
                description
                id
            }
            paginatorInfo{
                count
                lastPage
                currentPage
                total
            }
        }
    }
`;
export default function Pagination({page}) {

    const {error, loading, data} = useQuery(PAGINATION_QUERY);
    if (loading) return 'Loading ...';
    if (error) return 'Error...';
    console.log(page);
    const {lastPage, total} = data.advertisements.paginatorInfo;
    return (
        <PaginationStyles>
            <Head>
                <title>
                    Studiuj.pl - Strona {page} z {lastPage}
                </title>
            </Head>

            <Link href={`/user/advertisements/${page - 1}`} data-cool="true">
                <IconButton color="primary" size="medium" disabled={page <= 1}>
                    <a aria-disabled={page <= 1}><IoArrowBack/> </a>
                </IconButton>
            </Link>
            <p>
                Strona {page} z {lastPage}
            </p>
            <p className={"total"}>{total} ofert</p>
            <Link href={`/user/advertisements/${page + 1}`} data-cool="true">
                <IconButton color="primary" size="medium" disabled={page >= lastPage}>
                    <a aria-disabled={page >= lastPage}> <IoArrowForward/></a>
                </IconButton>
            </Link>
        </PaginationStyles>
    );
}
