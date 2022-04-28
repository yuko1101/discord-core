export = MessagePages;
declare class MessagePages {
    /**
     * @param {object} [options]
     * @param {(MessageCore | () => Promise<MessageCore>)[]} options.messageCores
     * @param {number} [options.startPageIndex]
     * @param {object} [options.pageActions]
     *  @param {{label?: string, buttonStyle?: MessageButtonStyleResolvable}} [options.pageActions.first]
     *  @param {{label?: string, buttonStyle?: MessageButtonStyleResolvable}} [options.pageActions.back]
     *  @param {{label?: string, buttonStyle?: MessageButtonStyleResolvable}} [options.pageActions.next]
     *  @param {{label?: string, buttonStyle?: MessageButtonStyleResolvable}} [options.pageActions.last]
     * @param {("FIRST"|"BACK"|"NEXT"|"LAST"|Action)[]} [options.enabledActions]
     * @param {boolean} [options.useButtons]
     * @param {number} [options.timeout]
     * @param {(User) => Promise<boolean>} [options.userFilter]
     */
    constructor(options?: {
        messageCores: (MessageCore | (() => Promise<MessageCore>))[];
        startPageIndex?: number;
        pageActions?: {
            first?: {
                label?: string;
                buttonStyle?: MessageButtonStyleResolvable;
            };
            back?: {
                label?: string;
                buttonStyle?: MessageButtonStyleResolvable;
            };
            next?: {
                label?: string;
                buttonStyle?: MessageButtonStyleResolvable;
            };
            last?: {
                label?: string;
                buttonStyle?: MessageButtonStyleResolvable;
            };
        };
        enabledActions?: ("FIRST" | "BACK" | "NEXT" | "LAST" | Action)[];
        useButtons?: boolean;
        timeout?: number;
        userFilter?: (User: any) => Promise<boolean>;
    });
    /** @readonly @type {object} */
    readonly options: object;
    /** @readonly @type {(MessageCore|() => Promise<MessageCore>)[]} */
    readonly messageCores: (MessageCore | (() => Promise<MessageCore>))[];
    /** @readonly @type {number} */
    readonly startPageIndex: number;
    /** @readonly @type {{first: {label: string, buttonStyle: MessageButtonStyleResolvable}, back: {label: string, buttonStyle: MessageButtonStyleResolvable}, next: {label: string, buttonStyle: MessageButtonStyleResolvable}, last: {label: string, buttonStyle: MessageButtonStyleResolvable}}} */
    readonly pageActions: {
        first: {
            label: string;
            buttonStyle: MessageButtonStyleResolvable;
        };
        back: {
            label: string;
            buttonStyle: MessageButtonStyleResolvable;
        };
        next: {
            label: string;
            buttonStyle: MessageButtonStyleResolvable;
        };
        last: {
            label: string;
            buttonStyle: MessageButtonStyleResolvable;
        };
    };
    /** @readonly @type {("FIRST"|"BACK"|"NEXT"|"LAST"|Action)[]} */
    readonly enabledActions: ("FIRST" | "BACK" | "NEXT" | "LAST" | Action)[];
    /** @readonly @type {boolean} */
    readonly useButtons: boolean;
    /** @readonly @type {number | null} */
    readonly timeout: number | null;
    /** @readonly @type {(User) => Promise<boolean>} */
    readonly userFilter: (User: any) => Promise<boolean>;
    /** @readonly @type {boolean} */
    readonly isSent: boolean;
    /** @readonly @type {Message | null} */
    readonly sentMessage: Message | null;
    /** @readonly @type {Interaction | null} */
    readonly interaction: Interaction | null;
    /** @readonly @type {number} */
    readonly currentPageIndex: number;
    /**
     * Sends this MessagePages message to the channel
     * @param {TextBasedChannel} channel
     * @returns {Promise<Message>}
     */
    sendTo(channel: TextBasedChannel): Promise<Message>;
    /**
     *
     * @param {number} index
     * @returns
     */
    gotoPage(index: number): Promise<void>;
    /**
     * @private
     * @param {number} index
     * @returns {Promise<MessageOptions>}
     */
    private _getMessageOptionsWithComponents;
    /**
     * @private
     * @param {number} index
     * @returns {Promise<MessageCore>}
     */
    private _getPage;
    /**
     * Gets necessary buttons for this MessagePages
     * @private
     * @returns {MessageButton[]}
     */
    private _getButtons;
    /**
     * @param {object} options
     * @param {number} [options.oldIndex]
     * @param {number} options.newIndex
     * @param {boolean} [options.shouldApplyPageActions]
     */
    _manageActions(options: {
        oldIndex?: number;
        newIndex: number;
        shouldApplyPageActions?: boolean;
    }): Promise<void>;
    /**
     * Updates reactions at the sent MessagePages message for current page
     * @private
     */
    private _updateReactions;
    /**
     * Gets necessary emojis for the page
     * @private
     * @param {number} index
     * @returns {Promise<string[]>}
     */
    private _getEmojis;
    /**
     * Gets necessary emojis for this MessagePages
     * @private
     * @returns {string[]}
     */
    private _getMessagePagesEmojis;
    /**
     * Gets system emojis for this MessagePages.
     * Such as "FIRST", "BACK", "NEXT", "LAST" emoji.
     * @private
     * @returns {string[]}
     */
    private _getSystemEmojis;
    /**
     * Reaction collector for this MessagePages' emojis
     * @private
     */
    private _activateReactionCollector;
    _deactivateEmojiActions(): void;
}
import MessageCore = require("./MessageCore");
import { MessageButtonStyleResolvable } from "discord.js";
import Action = require("../action/Action");
import { Message } from "discord.js";
import { TextBasedChannel } from "discord.js";