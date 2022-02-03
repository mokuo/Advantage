import Organization from "#src/domain/models/Organizations/Organization";
import TennisCourtFrame from "#src/domain/models/TennisCourtFrames/TennisCourtFrame";

class MessageBuilder {
  buildMessage(organizations: Organization[], tennisCourtFrames: TennisCourtFrame[]): string {
    let text = "";

    organizations.forEach((org, orgIndex) => {
      if (orgIndex !== 0) {
        text += "\n";
      }

      org.facilities.forEach((facility, facilityIndex) => {
        if (facilityIndex !== 0) {
          text += "\n";
        }

        const filteredFrames = tennisCourtFrames.filter(
          (frame) => frame.status.toString() === "available" && frame.facilityId.isEqual(facility.id)
        );
        if (filteredFrames.length === 0) {
          return;
        }

        text += `# ${org.name.toString()} ${facility.name.toString()}\n`;

        filteredFrames.forEach((frame) => {
          text += `- ${frame.name.toString()} ${frame.usageTime.toString()}\n`;
        });
      });
    });

    return text;
  }
}

export default MessageBuilder;
