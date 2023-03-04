import { useState, useEffect } from 'react'
import { Icons } from '../Images/Icons'
import heder from "../Images/heder.png"
import ellipse from '../Images/ellipse.png'
import line from '../Images/line.png'
import {BoxTop, BoxItem, List, ImgHeder, ImgAvatar, ImgEllipse, Imgline, TweetsContainer, TweetsStatistics, TweetsStatisticsBtnFollow, TweetsStatisticsBtnFollowing} from './TweetsStyled'


export function TweetsItem({user}) {
    const { id, avatar, name, tweets, followers } = user;
    const FLLS = `isFollowers${id}`;
    const DSLS = `disabled${id}`;

    const useLocalStorage = initialState => {
        const [state, setState] = useState(initialState);
        const storage = () => {
            setState(!state);
        };
            return [state, storage];
    }

    const [isFollowers, setIsFollowers] = useState(() => {
        return JSON.parse(window.localStorage.getItem(FLLS)) ?? followers;
    });

    const [disabled, StorageDisabled] = useLocalStorage(() => {
        return JSON.parse(window.localStorage.getItem(DSLS)) ?? true
    });

    useEffect(() => {
        window.localStorage.setItem(FLLS, JSON.stringify(isFollowers));
        window.localStorage.setItem(DSLS, JSON.stringify(disabled))
    },
        [isFollowers, FLLS, disabled, DSLS]
    );
    

    const changeBtn = () => {
        if (disabled) {
            StorageDisabled(!disabled);
            setIsFollowers(prevState => prevState + 1);
        } else {
            StorageDisabled(!disabled);
            setIsFollowers(prevState => prevState - 1);
        }
    }
    return (
        <BoxItem >
            <BoxTop>
                <Icons id="icon-logo" />
                <ImgHeder src={heder} alt="heder" />
                <Imgline src={line} alt="line" />
                <ImgEllipse src={ellipse} alt="ellipse" />
                <ImgAvatar src={avatar} alt={name} />
            </BoxTop>
            <TweetsContainer>
                <TweetsStatistics>
                     {tweets}  TWEETS
                </TweetsStatistics>
                <TweetsStatistics>
                    {isFollowers.toLocaleString('ja-JP')} FOLLOWERS
                </TweetsStatistics>
                {disabled
                ?
                <TweetsStatisticsBtnFollow type="button" onClick={() => changeBtn({ isFollowers })} >FOLLOW</TweetsStatisticsBtnFollow>
                :
                <TweetsStatisticsBtnFollowing type="button" onClick={() => changeBtn({ isFollowers })} >FOLLOWING</TweetsStatisticsBtnFollowing>
            }

            </TweetsContainer>
        </BoxItem>
    )

};
    
export default function TweetsList({users}) {
    return (
        <List>
            {users.map(user => (
                <TweetsItem
                    key={user.id}
                    user={user}
                />
            ))}

        </List>
    )
    };
