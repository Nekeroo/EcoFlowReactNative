import { User } from "@/constants/models/user";
import { View, Text } from "react-native";

interface DetailsProps {
    user : User
}

const Details = (props: DetailsProps) => {
    return (
        <View>
            <Text>User Details</Text>
            <Text>Email : {props.user.mail}</Text>
            <Text>Nom : {props.user.lastName}</Text>
            <Text>Prénom : {props.user.firstName}</Text>
        </View>
    )
}

export default Details;