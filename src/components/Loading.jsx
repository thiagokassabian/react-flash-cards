import ClipLoader from 'react-spinners/ClipLoader';

const Loading = ({ loading = true }) => {
	return <ClipLoader loading={loading} />;
};

export default Loading;
