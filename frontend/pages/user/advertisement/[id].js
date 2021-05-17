import SingleProduct from '../../components/SingleProduct';

export default function SingleAdvertisementPage({query}) {
    return <SingleProduct id={query.id}/>;
}
