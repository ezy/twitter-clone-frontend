import React from "react";
import CustomResponse from "../components/CustomResponse";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Tweet from "../components/Tweet/Tweet";
import styled from "styled-components";
import { MENTIONS } from "../queries/others";
import { useQuery } from "@apollo/react-hooks";

const Wrapper = styled.div``;

const Notifications = () => {
  const { data, loading } = useQuery(MENTIONS);

  if (loading) return <Loader />;

  return (
		<Wrapper>
			<Header>
				<span>Notifications</span>
			</Header>
      {data?.mentions?.length ? (
        data.mentions.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
		</Wrapper>
	);
};

export default Notifications;
