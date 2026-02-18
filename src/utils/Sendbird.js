import SendbirdChat from "@sendbird/chat";
import { GroupChannelModule } from "@sendbird/chat/groupChannel";

const sb = SendbirdChat.init({
    appId: process.env.NEXT_PUBLIC_SENDBIRD_APP_ID,
    modules: [new GroupChannelModule()],
});

export const CreateSendBirdChannel = async (users, title, carDetail) => {
    try {
        const userId = users[0];
        await sb.connect(userId);
        let carImageUrl = "";
        if (carDetail?.images && carDetail.images.length > 0) {
            carImageUrl = carDetail.images[0]?.imageUrl || "";
        }

        const params = {
            invitedUserIds: users,
            // coverUrl: carImageUrl,
            isDistinct: true,
        };
        const channel = await sb.groupChannel.createChannel(params);

        const textParams = {
            message: `Hi, I am interested in ${carDetail.listingTitle} listed for $${carDetail.sellingPrice}.`,
        };
        channel.sendUserMessage(textParams);
        if (carImageUrl) {
            try {
                const response = await fetch(carImageUrl);
                const blob = await response.blob();
                const file = new File([blob], "car_image.jpg", { type: blob.type });

                const fileParams = {
                    file: file,
                    fileName: 'car_preview.jpg',
                    mimeType: blob.type,
                    customType: 'car-inquiry-image'
                };

                channel.sendFileMessage(fileParams);

            } catch (err) {
                console.log("⚠️ Could not send image as file (CORS issue possible):", err);
                channel.sendUserMessage({ message: carImageUrl });
            }
        }


        return channel;

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}