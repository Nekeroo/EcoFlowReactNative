import { User } from "firebase/auth";
import { View, Text } from "react-native";

interface DetailsProps {
    user : User
}

const Details = (props: DetailsProps) => {
    return (
        <View>
            <Text>User Details</Text>
            <Text>Email : {props.user.email}</Text>
            <Text>Nom : {props.user.displayName}</Text>
            <Text> Uid : {props.user.uid}</Text>
        </View>
    )
}

export default Details;