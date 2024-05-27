const Index = () => {
  return (
    <>
      <div>
        Hello from forexplore backend API with{' '}
        {process.env.CURRENT_ENV == 'PROD' ? 'PROD' : 'DEV'} Environment
      </div>
      <div>sandbox - /api/graphql</div>
    </>
  );
};

export default Index;
