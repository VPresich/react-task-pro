import DocumentTitle from '../../components/DocumentTitle';
import Layout from '../../components/Layout/Layout';
// import Filters from '../../components/Filters/Filters';
import Board from '../../components/Board/Board';

export default function ScreenPage() {
  return (
    <Layout>
      <DocumentTitle>Screen Page</DocumentTitle>
      {/* <Filters /> */}
      <Board />
    </Layout>
  );
}
